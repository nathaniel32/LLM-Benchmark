import { api_get_hub_sql_schema, api_create_category, api_delete_category, api_get_all_categories, api_get_all_models, api_run_hub_sql, api_create_model, api_delete_model, api_get_all_inputs, api_delete_input, api_get_all_outputs, api_delete_output } from './api.js';
new Vue({
    el: '#app',
    data: {
        v_active_section: 'categories',
        v_info: '',
        v_categories: [],
        v_input_category: '',
        v_hub_sql: [],
        v_input_hub_sql: `SELECT c_input, t_output.c_output_final, c_score, c_model, c_category
FROM t_output
JOIN t_input ON t_input.c_id = t_output.t_input_id 
JOIN t_model ON t_model.c_id = t_output.t_model_id
JOIN t_category ON t_category.c_id = t_input.t_category_id`,
        v_hub_sql_schema: '',
        v_show_schema: '',
        v_models: [],
        v_input_model: '',
        v_inputs: [],
        v_outputs: [],
        expandedKeys: []
    },
    updated() {
        /* this.$nextTick(() => {
            this.render_latex();
        }); */
    },
    /* watch: {
        v_hub_sql: {
            handler() {
                this.$nextTick(() => {
                    this.render_latex();
                });
            },
            deep: true,
        },
        v_active_section: {
            handler() {
                this.$nextTick(() => {
                    this.render_latex();
                });
            },
            deep: true,
        }
    }, */
    methods:{
        f_init(){
            this.f_display_categories();
            this.f_display_models();
            this.f_display_inputs();
            this.f_display_outputs();
            this.f_get_hub_sql_schema();
        },
        f_clear_info(duration){
            setTimeout(()=>{
                this.v_info = "";
            }, duration);
        },
        f_get_th_style(key){
            if (this.expandedKeys.includes(key)) {
                return {
                    maxWidth: 'none',
                    maxHeight: 'none',
                    whiteSpace: 'normal',
                    overflow: 'visible',
                    textOverflow: 'unset'
                };
            } else {
                return {
                    maxWidth: '300px',
                    maxHeight: '60px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                };
            }
        },
        toggle_key(key, event=null){

            if (this.expandedKeys.includes(key)) {
                this.expandedKeys = this.expandedKeys.filter(k => k !== key);
            } else {
                if(event){
                    this.render_latex(event.currentTarget);
                }
                this.expandedKeys.push(key);
            }
        },
        render_latex(element) {
            setTimeout(() => {
                MathJax.typesetPromise([element]).catch((err) => console.log(err.message));
            }, 0);
        },
        f_render_markdown(text) {
            if (this.expandedKeys.includes(text)) {
                if (typeof text !== 'string') return text;
                return marked.parse(text);
            } else {
                return text;
            }
        },
        // --- Category ---
        async f_display_categories(){
            const get_categories_res = await api_get_all_categories();
            if(get_categories_res.error){
                this.v_info = get_categories_res.message;
                this.f_clear_info(10000);
                return;
            }
            this.v_categories = get_categories_res.data;
        },
        async f_create_category(){
            const create_category_res = await api_create_category(this.v_input_category);
            if(create_category_res.error){
                this.v_info = create_category_res.message;
                this.f_clear_info(10000);
                return;
            }
            this.f_display_categories();
            this.v_input_category = '';
        },
        async f_delete_category(id){
            const confirmed = confirm("Are you sure you want to delete this category?");
            if (!confirmed) return;
            const delete_category_res = await api_delete_category(id);
            if(delete_category_res.error){
                this.v_info = delete_category_res.message;
                this.f_clear_info(10000);
                return;
            }
            this.f_display_categories();
        },

        // --- Hub ---
        async f_run_hub_sql(){
            const run_hub_sql_res = await api_run_hub_sql(this.v_input_hub_sql);
            if(run_hub_sql_res.error){
                this.v_info = run_hub_sql_res.message;
                this.f_clear_info(10000);
                return;
            }
            
            if(run_hub_sql_res.data.length != 0){
                this.v_hub_sql = run_hub_sql_res.data;
                this.v_info = run_hub_sql_res.messages;
            }else{
                this.v_info = "No Results!";
            }
            this.f_clear_info(10000);
        },
        async f_get_hub_sql_schema(){
            const get_hub_sql_schema_res = await api_get_hub_sql_schema();
            if(get_hub_sql_schema_res.error){
                this.v_info = get_hub_sql_schema_res.message;
                this.f_clear_info(10000);
                return;
            }
            this.v_hub_sql_schema = get_hub_sql_schema_res.data;
        },

        // --- Model ---
        async f_display_models(){
            const get_models_res = await api_get_all_models();
            if(get_models_res.error){
                this.v_info = get_models_res.message;
                this.f_clear_info(10000);
                return;
            }
            this.v_models = get_models_res.data;
        },
        async f_create_model(){
            const create_model_res = await api_create_model(this.v_input_model);
            if(create_model_res.error){
                this.v_info = create_model_res.message;
                this.f_clear_info(10000);
                return;
            }
            this.f_display_models();
            this.v_input_model = '';
        },
        async f_delete_model(id){
            const confirmed = confirm("Are you sure you want to delete this model?");
            if (!confirmed) return;
            const delete_model_res = await api_delete_model(id);
            if(delete_model_res.error){
                this.v_info = delete_model_res.message;
                this.f_clear_info(10000);
                return;
            }
            this.f_display_models();
        },

        // --- Input ---
        async f_display_inputs(){
            const get_inputs_res = await api_get_all_inputs();
            if(get_inputs_res.error){
                this.v_info = get_inputs_res.message;
                this.f_clear_info(10000);
                return;
            }
            this.v_inputs = get_inputs_res.data;
        },
        async f_delete_input(id){
            const confirmed = confirm("Are you sure you want to delete this data?");
            if (!confirmed) return;
            const delete_input_res = await api_delete_input(id);
            if(delete_input_res.error){
                this.v_info = delete_input_res.message;
                this.f_clear_info(10000);
                return;
            }
            this.f_display_inputs();
            this.f_display_outputs();
        },
        
        // --- Output ---
        async f_display_outputs(){
            const get_outputs_res = await api_get_all_outputs();
            if(get_outputs_res.error){
                this.v_info = get_outputs_res.message;
                this.f_clear_info(10000);
                return;
            }
            this.v_outputs = get_outputs_res.data;
        },
        async f_delete_output(id){
            const confirmed = confirm("Are you sure you want to delete this data?");
            if (!confirmed) return;
            const delete_output_res = await api_delete_output(id);
            if(delete_output_res.error){
                this.v_info = delete_output_res.message;
                this.f_clear_info(10000);
                return;
            }
            this.f_display_outputs();
        },
    },
    mounted() {
        this.f_init();
    }
});