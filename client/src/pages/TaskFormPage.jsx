import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams} from 'react-router-dom';
import { toast } from "react-hot-toast";

export function TasksFormPage() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Obtener la función de navegación utilizando useNavigate() para redirigir
  const navigate = useNavigate();

  const params = useParams();
  //console.log(params);

  //creo una funcion onSubmit que llama a handleSubmit de useForm que permite capturar los datos del form
  //La función handleSubmit es una función proporcionada por la librería react-hook-form, 
  //que facilita el manejo y validación de formularios en React.
  //handleSubmit se encarga de la validación de los campos, recolectar los datos ingresados por el usuario y llamar a la función onSubmit.
  const onSubmit = handleSubmit(async data => {
    if(params.id){
      //data contiene la información
      await updateTask(params.id, data);
      toast.success("Tarea actualizada correctamente", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: "#28dddd",
          color: "#fff",
          borderRadius: "10px",
        }
      });
    }
    else{
          await createTask(data);
          toast.success("Tarea creada correctamente", {
            position: "top-right",
            autoClose: 5000,
            style: {
              background: "#28a745",
              color: "#fff",
              borderRadius: "10px",
            }
          });
        }
   //console.log(data)
   //const res = await createTask(data) 
   console.log(data)
   //console.log(res.data.description)
   //luego de crear lo manda a la página de tareas
   navigate('/tasks');
  });

  //creamos un useEffect para que al momento de cargar la página se carguen los datos en el formulario
  useEffect(() => {
    async function loadTask(){
      if(params.id){
        const res = await getTask(params.id);
        console.log(res)
        //uso una función de useForm() y setValue cada uno de los datos que quiero mostrar
        setValue('title', res.data.title);
        setValue('description', res.data.description);
      }
    }
    loadTask();
  }, []);

    return (
      <div className="max-w-xl mx-auto">
        <form onSubmit={onSubmit} className="bg-zinc-800 p-10 rounded-lg mt-2">
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        />

        {errors.title && <span>This field is required</span>}

        <textarea
          placeholder="Description"
          {...register("description", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full"
        />

        {errors.description && <span>This field is required</span>}

        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
          Save
        </button>
      </form>

      {params.id && (
        <div className="flex justify-end">
          <button className="bg-red-500 p-3 rounded-lg w-48 mt-3" onClick={async () => {
          const accepted = window.confirm("Are you sure you want to delete this field?")
          if (accepted) {
                      //si aceptado es true, llamo a la función deleteTask y le paso el id que lo obtengo con el params
                     await deleteTask(params.id)
                     toast.success("Tarea eliminada correctamente", {
                      position: "top-right",
                      autoClose: 2000,
                      style: {
                        background: "#dc3545",
                        color: "#fff",
                        borderRadius: "10px",
                      }
                    });
                      //luego redirecciono a tasks
                      navigate('/tasks')
                    }
        }}>
        Delete
      </button>
        </div>
      )}
      
      </div>
    )
  }
  