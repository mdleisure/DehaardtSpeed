Vue.createApp({

    data() {
    return {
    message: 'Testing DeHaardt Black Box with Express Vue',
    }
    },
    methods: {
    async SendCmd(speed){
        const payload={ setSpeed: (speed) }
        const response = await axios.post(`/dh`,payload)
    console.log("Send command",speed)
    }
}
    }).mount('#app')