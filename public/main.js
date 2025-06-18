import { prompt_bot } from './bot.js';
import config from './config.js';

new Vue({
    el: '#app',
    data: {
        v_info:"",
        v_rule:"",
        v_url:"",
        v_temperature:"",
        v_models:[],
        v_content: "",
        v_responses:[]
    },
    methods:{
        f_init(){
            this.v_rule = config.bot_rules;
            this.v_url = config.bot_url;
            this.v_temperature = config.bot_temperature;
            this.v_models = config.bot_model.map(item => ({ value: item }));
        },
        f_clear_info(duration){
            setTimeout(()=>{
                this.v_info = "";
            }, duration);
        },
        async f_prompt(){
            this.v_info = "prompt...";
            this.v_responses = [];
            const promises = this.v_models.map(async model => {
                const messages = [
                    {
                        role: "system",
                        content: this.v_rule
                    },
                    {
                        role: "user",
                        content: this.v_content
                    }
                ];
                const response = await prompt_bot(this.v_url, this.v_temperature, model.value, messages);
                return {
                    think: marked.parse(response.think),
                    final: marked.parse(response.final),
                    total_duration: response.total_duration
                };
            });

            const results = await Promise.all(promises);
            this.v_responses.push(...results);
            this.f_clear_info(0);
        },
        f_upload_data(){
            this.v_info = "uploading...";
            this.v_responses.forEach(response => {
                console.log(response);
            });
            this.f_clear_info(10000);
        }
    },
    created() {
        this.f_init();
    }
});