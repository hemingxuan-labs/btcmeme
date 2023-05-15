export default class WebSocketCreate {
    constructor() {
        this.webSocketss = new WebSocket('ws://192.168.0.15:30601/ws')
        console.log(this.webSocketss, this, 'this.webSocketthis.webSocketss')
        this.webSocketss.onopen = this.webSocketOnOpen
        this.webSocketss.onclose = this.webSocketOnClose
        this.webSocketss.onmessage = this.webSocketOnMessage
        this.webSocketss.onerror = this.webSocketOnError
    }
    webSocketOnClose() {
        console.log('websocket关闭')
    }
    webSocketOnError() {}

    webSocketOnOpen() {
        console.log('websocket连接成功111', this)
        this.webSocketss.send(
            JSON.stringify({
                type: 'heartbeat',
                data: new Date().valueOf(),
            })
        )
        setInterval(() => {
            this.webSocketss.send(
                JSON.stringify({
                    type: 'heartbeat',
                    data: new Date().valueOf(),
                })
            )
        }, 5000)
    }
    webSocketSend(type, data) {
        // 发送数据
        this.webSocketss?.send(
            JSON.stringify({
                type,
                data,
            })
        )
    }
    webSocketOnMessage(event) {
        // webSocket接受数据回调
        const reader = new FileReader()
        reader.readAsText(event.data, 'UTF-8')
        reader.onload = (e) => {
            let result = JSON.parse(reader.result)
            switch (result.type) {
                case 'heartbeat':
                    setHeartbeatTime(new Date().valueOf())
                    heartbeatTimeRef.current = heartbeatTime
                    break
                case 'createTiles':
                    scene.createTiles(wsMessage.data)
                    break
                case 'updateTile':
                    scene.updateTile(wsMessage.data)
                    break
                case 'unitMoveTo':
                    scene.unitMoveTo(wsMessage.data)
                    break
                case 'createNpc':
                    scene.createNpc(wsMessage.data)
                    break
                case 'deleteNpc':
                    scene.deleteNpc(wsMessage.data)
                    break
                case 'fightFinished':
                    scene.fightFinished(wsMessage.data)
                // Guide and replenish troops data={}
                // eslint-disable-next-line
                case 'guideRecruit':
                    let res401 = getUsherGuide(guideIds[1].id)
                    if (res401) showAlert(res401.context, guideRecruit, 'Notice')
                    break
                // Guiding technological upgrading data=techld: <int> ke ji id
                case 'guideTech':
                    let res501 = getUsherGuide(guideIds[2].id)
                    if (res501) showAlert(res501.context, guideTech, 'Notice')
                    break
                default:
                    break
            }
        }
    }
}
