import { prompt_bot } from './bot.js';
import { api_get_all_categories, api_get_all_models, api_create_input, api_create_output } from './api.js';
import { html_to_text } from './utils.js';
import config from './config.js';

new Vue({
    el: '#app',
    data: {
        v_categories: {select: 0, option:[{c_category:"category", c_id: "0"}]},
        v_info:"",
        v_rule:"",
        v_url:"",
        v_temperature:"",
        v_models:[],
        v_content: "",
        v_responses:[]
    },
    methods:{
        async f_init(){
            this.v_rule = config.bot_rules;
            this.v_url = config.bot_url;
            this.v_temperature = config.bot_temperature;
            //this.v_models = config.bot_model.map(item => ({ value: item }));
            this.v_models = await api_get_all_models();
            const new_categories = await api_get_all_categories();
            this.v_categories.option.push(...new_categories);
        },
        f_clear_info(duration){
            setTimeout(()=>{
                this.v_info = "";
            }, duration);
        },
        async f_prompt(){
            if (this.v_content == ''){
                this.v_info = "fill input";
                this.f_clear_info(1000);
                return;
            }
            if (this.v_categories.select == 0) {
                this.v_info = "fill category";
                this.f_clear_info(1000);
                return;
            }
            this.v_info = "prompt...";
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
                const response = await prompt_bot(this.v_url, this.v_temperature, model.c_model, messages);
                return {
                    model: model.c_id,
                    think: marked.parse(response.think),
                    final: marked.parse(response.final),
                    total_duration: response.total_duration
                };
            });

            const results = await Promise.all(promises);
            this.v_responses.push(...results);
            this.f_clear_info(0);
        },
        async f_upload_data() {
            this.v_info = "uploading...";
            for (const response of this.v_responses) {
                if (typeof response.score !== 'number') {
                    this.v_info = "fill score";
                    this.f_clear_info(1000);
                    return;
                }
            }

            const input_res = await api_create_input(this.v_content, this.v_categories.select);
            
            if (!input_res.id){
                this.v_info = input_res;
                this.f_clear_info(5000);
                this.v_responses = [];
                return;
            };

            const res_output = [];
            for (const response of this.v_responses) {
                res_output.push(await api_create_output(html_to_text(response.final), response.total_duration, 100, response.score, "ok", "google.com", input_res.id, response.model));
            };

            this.v_info = JSON.stringify(res_output, null, 2);
            this.f_clear_info(1000);
            this.v_content = "";
            this.v_responses = [];
        },
        f_cancel_upload_data(){
            this.v_info = "canceled";
            this.f_clear_info(1000);
            this.v_content = "";
            this.v_responses = [];
        }
    },
    created() {
        this.f_init();
    }
});