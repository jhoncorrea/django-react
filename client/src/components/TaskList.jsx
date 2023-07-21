import { useEffect, useState } from "react"
import { getAllTasks } from "../api/tasks.api"
import { TaskCard } from "./TaskCard";

export function TaskList() {

    const [tasks, setTasks] = useState([]);
  
    //uso el useEffect para que cuando se cargue la página se renderice el componente
    useEffect(() => {
        //creo una función para cargar las tareas 
        async function loadTasks() {
            const res = await getAllTasks();
            setTasks(res.data);
        }
        loadTasks();
    }, [])
  
    return (
        <div className="grid grid-cols-3 gap-3">
            {tasks.map(a => (
               <TaskCard key={a.id} b = {a}/>
            ))}
        </div>
  )
}
