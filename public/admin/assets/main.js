import { api_get_hub_sql_schema, api_create_category, api_delete_category, api_get_all_categories, api_get_all_models, api_run_hub_sql, api_create_model, api_delete_model } from './api.js';
new Vue({
    el: '#app',
    data: {
        v_active_section: 'categories',
        v_info: '',
        v_categories: [],
        v_input_category: '',
        v_hub_sql: [],
        v_input_hub_sql: `select * from t_output
join t_input on t_input.c_id = t_output.t_input_id 
join t_model on t_model.c_id = t_output.t_model_id
join t_category on t_category.c_id = t_input.t_category_id`,
        v_hub_sql_schema: '',
        v_show_schema: '',
        v_models: [],
        v_input_model: '',
    },
    methods:{
        f_init(){
            this.f_display_categories();
            this.f_display_models();
            this.f_get_hub_sql_schema();
        },
        f_clear_info(duration){
            setTimeout(()=>{
                this.v_info = "";
            }, duration);
        },
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
            const delete_category_res = await api_delete_category(id);
            if(delete_category_res.error){
                this.v_info = delete_category_res.message;
                this.f_clear_info(10000);
                return;
            }
            this.f_display_categories();
        },
        async f_run_hub_sql(){
            const run_hub_sql_res = await api_run_hub_sql(this.v_input_hub_sql);
            if(run_hub_sql_res.error){
                this.v_info = run_hub_sql_res.message;
                this.f_clear_info(10000);
                return;
            }
            this.v_hub_sql = run_hub_sql_res.data;
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
            const delete_model_res = await api_delete_model(id);
            if(delete_model_res.error){
                this.v_info = delete_model_res.message;
                this.f_clear_info(10000);
                return;
            }
            this.f_display_models();
        }
    },
    created() {
        this.f_init();
    }
});