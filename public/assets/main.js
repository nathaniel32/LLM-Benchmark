import { prompt_bot_chat, prompt_bot_generate } from './bot.js';
import { api_get_all_categories, api_get_all_models, api_create_input, api_create_output } from './api.js';
import config from './config.js';

new Vue({
    el: '#app',
    data: {
        v_processing: false,
        v_categories: {select: '', option:[]},
        v_info:"",
        v_rule:"",
        v_url:"",
        v_temperature:"",
        v_models:[],
        v_content: "",
        v_note: "",
        v_responses:[]
    },
    methods:{
        async f_init(){
            this.v_rule = config.bot_rules;
            this.v_url = config.bot_url;
            this.v_temperature = config.bot_temperature;
            const model_res = await api_get_all_models();
            if (model_res.error){
                this.v_info = model_res.message;
                this.f_clear_info(10000);
                return;
            }else{
                this.v_models = model_res.data;
            }
            const new_categories = await api_get_all_categories();
            if (new_categories.error){
                this.v_info = new_categories.message;
                this.f_clear_info(10000);
                return;
            }else{
                this.v_categories.option.push(...new_categories.data);
            }
        },
        f_clear_info(duration){
            setTimeout(()=>{
                this.v_info = "";
            }, duration);
        },
        async f_prompt() {
            if (this.v_content == '') {
                this.v_info = "Fill the content in the box below!";
                this.f_clear_info(10000);
                return;
            }

            if (this.v_categories.select == 0) {
                this.v_info = "Fill the category in the box below!";
                this.f_clear_info(10000);
                return;
            }

            this.v_processing = true;

            this.v_info = "prompt...";

            if(this.v_models.length == 0){
                this.v_info = "no ai models available";
                this.f_clear_info(10000);
                this.v_processing = false;
                return;
            }

            for (const model of this.v_models) {
                let response;

                if (this.v_rule && this.v_rule !== '') {
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
                    response = await prompt_bot_chat(this.v_url, this.v_temperature, model.c_model, messages);
                } else {
                    response = await prompt_bot_generate(this.v_url, this.v_temperature, model.c_model, this.v_content);
                }

                if (response.error) {
                    this.v_info = response.message;
                    this.f_clear_info(10000);
                    this.v_processing = false;
                    return;
                }

                this.v_responses.push({
                    model: model.c_id,
                    think: response.data.think,
                    final: response.data.final,
                    total_duration: response.data.total_duration,
                    load_duration: response.data.load_duration,
                    prompt_eval_count: response.data.prompt_eval_count,
                    prompt_eval_duration: response.data.prompt_eval_duration,
                    eval_count: response.data.eval_count,
                    eval_duration: response.data.eval_duration
                });
            }

            this.f_clear_info(0);
            this.v_processing = false;
        },
        async f_upload_data() {
            this.v_info = "uploading...";
            for (const response of this.v_responses) {
                if (typeof response.score !== 'number') {
                    this.v_info = "Fill in all the scores in the box below!";
                    this.f_clear_info(10000);
                    return;
                }
            }

            this.v_rule = this.v_rule === '' ? null : this.v_rule;
            this.v_note = this.v_note === '' ? null : this.v_note;

            const input_res = await api_create_input(this.v_content, this.v_rule, this.v_temperature, this.v_note, this.v_categories.select);

            if (input_res.error || !input_res.data.id){
                this.v_info = input_res.message;
                this.f_clear_info(10000);
                //this.v_responses = [];
                return;
            }

            const res_output = [];
            
            for (const response of this.v_responses) {
                response.think = response.think === '' ? null : response.think;
                response.note = response.note === '' ? null : response.note;
                const output_res = await api_create_output(response.think, response.final, response.total_duration, response.load_duration, response.prompt_eval_count, response.prompt_eval_duration, response.eval_count, response.eval_duration, response.score, response.note, input_res.data.id, response.model);
                if (output_res.error){
                    this.v_info = output_res.message;
                    this.f_clear_info(10000);
                    return;
                }else{
                    res_output.push(output_res.data);
                }
            };

            this.v_info = JSON.stringify(res_output, null, 2);
            this.f_clear_info(10000);
            this.v_content = "";
            this.v_note = "";
            this.v_responses = [];
        },
        f_cancel_upload_data(){
            this.v_info = "canceled";
            this.f_clear_info(10000);
            //this.v_content = "";
            //this.v_note = "";
            this.v_responses = [];
        },
        f_render_markdown(text) {
            setTimeout(()=>{
                MathJax.typeset();
            },0);
            return marked.parse(text);
        },
        f_on_score_input(response){
            const value = parseInt(response.score)
            if (value > 5) response.score = 5
            else if (value < 1) response.score = 1
        }
    },
    created() {
        this.f_init();
    }
});