Vue.createApp({

    mounted() {

        // this.getkarts()
      
    },

    data() {
    return {
    message: 'Testing DeHaardt Black Box with Express Vue',
    kartList: [],
    }
    },
    methods: {
    async SendCmd(speed,transponder){
        const payload={ setSpeed: (speed),trans:(transponder) }
        const response = await axios.post(`/dh`,payload)
    console.log("Send command",speed, "Trans no",transponder)
    console.log("payload is now ",payload)
    },

    async getkarts(){
        // const Karts = await axios.post(`${this.serverUrl}/api/v1/vehicles`)
        const {data : data} = await axios.get('http://192.168.0.40:8000/api/v1/vehicles')
        this.kartList=data
        console.log(data)
    }
}
    }).mount('#app')