import { prompt_bot } from './bot.js';
import config from './config.js';

new Vue({
    el: '#app',
    data: {
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
        f_prompt(){
            this.v_models.forEach(async model => {
                const messages = [
                    {
                        role: "system",
                        content: this.v_rule
                    },
                    {
                        role: "user",
                        content: this.v_content
                    }
                ]
                const response = await prompt_bot(this.v_url, this.v_temperature, model.value, messages);
                this.v_responses.push({think:marked.parse(response.think), final:marked.parse(response.final), total_duration:response.total_duration});
            });
        },
        f_upload_data(){
            console.log("ok");
        }
    },
    created() {
        this.f_init();
    }
});