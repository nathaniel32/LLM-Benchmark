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
        v_response:{think:"", final:""}
    },
    methods:{
        f_init(){
            this.v_rule = config.bot_rules;
            this.v_url = config.bot_url;
            this.v_temperature = config.bot_temperature;
            this.v_models = config.bot_model.map(item => ({ value: item }));
        },
        async f_prompt(){
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
            const response = await prompt_bot(this.v_url, this.v_temperature, this.v_models[1].value, messages);
            this.v_response.think = marked.parse(response.think);
            this.v_response.final = marked.parse(response.final);
        }
    },
    created() {
        this.f_init();
    }
});