//importo la libreria axios para hacer consultas http
import axios from 'axios';

//creo una const con la ruta de la api
const tasksApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/tasks/api/v1/tasks/'
})

export const getAllTasks = () => {
    //como no estoy haciendo nada antes del return lo podría quitar
    return tasksApi.get('/');
}

//para obtener una tarea, necesito su id
export const getTask = (id) => tasksApi.get(`/${id}/`);

//uso el post para crear y le paso la task
export const createTask = (task) => {
    return tasksApi.post('/', task);
}

//para eliminar necesito el id del task
export const deleteTask = (id) => tasksApi.delete(`/${id}/`);

//para actualizar necesito el id del task y el nuevo task
export const updateTask = (id, task) => tasksApi.put(`/${id}/`, task);