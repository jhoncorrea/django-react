import { useNavigate } from "react-router-dom";

export function TaskCard({b}) {

  //para redireccionar
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer" onClick={() => {
      navigate('/tasks/' + b.id);
      //esta es otra forma navigate(`/tasks/${b.id}`)
    }}>
        <h1 className="font-bold uppercase">{b.title}</h1>
        <p className="text-slate-400">{b.description}</p>
       
    </div>
  )
}
