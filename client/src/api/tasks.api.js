//importo la libreria axios para hacer consultas http
import axios from 'axios';

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

console.log(URL);
const tasksApi = axios.create({
  baseURL: `${URL}/tasks/api/v1/tasks/`,
});


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
export const deleteTask = (id) => tasksApi.delete(`/${id}`);

//para actualizar necesito el id del task y el nuevo task
export const updateTask = (id, task) => tasksApi.put(`/${id}/`, task);