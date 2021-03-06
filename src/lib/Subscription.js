// @flow
import guid from '../lib/guid'

export type ActionType = 'create' | 'update' | 'destroy'
export type CallbackType = (action: ActionType, object: any) => void

let waitForConnect = new Promise(() => {})

const Command = {
  subscribe: (guid: string,
    model: string,
    condition: ?string,
    getUrlOptions: ?Object) => JSON.stringify({
      command: 'subscribe',
      args: { model, condition, guid, getUrlOptions}
    })
  ,

  unSubscribe: (guid: string) => JSON.stringify({ command: 'unSubscribe', args: { guid } })
}

let _webSocket: ?WebSocket
const _callbacks: { [key: string]: CallbackType } = {}

class Subscription {
  _guid: string
  _model: string
  _condition: ?string
  _getUrlOptions: ?Object

  static connect(url, protocol) {
    Subscription._disconnectIfOpen()
    _webSocket = new WebSocket(url, protocol)
    _webSocket.onmessage = Subscription._onMessage
    waitForConnect = new Promise((resolve, reject) => {
      _webSocket.onopen = resolve
    })
  }

  static _onMessage(e: MessageEvent) {
    let message
    try {
      // $FlowIgnore todo
      message = JSON.parse(e.data)
    } catch (e) {
      console.error(e)
      return
    }

    const { guid, action, object } = message
    const callback = _callbacks[guid]
    if (callback != null) callback(action, object)
  }

  static _disconnectIfOpen() {
    if (_webSocket != null) {
      _webSocket.close()
      _webSocket = null
    }
  }

  constructor(model: string, condition: ?string, getUrlOptions: ?Object, callback: CallbackType) {
    this._guid = guid()
    this._model = model
    this._condition = condition
    this._getUrlOptions = getUrlOptions
    _callbacks[this._guid] = callback
  }

  open() {
    if (_webSocket != null) {
      waitForConnect.then(() => {
        _webSocket.send(Command.subscribe(this._guid, this._model, this._condition, this._getUrlOptions))
      })
    } else {
      console.error('Connection not established')
    }
  }

  close() {
    if (_webSocket != null) _webSocket.send(Command.unSubscribe(this._guid))
  }

  isEqual(subscription: Subscription) {
    if (subscription == null) return false
    return this._model === subscription._model &&
      this._condition === subscription._condition &&
      this._getUrlOptions === subscription._getUrlOptions 
  }
}

export default Subscription
