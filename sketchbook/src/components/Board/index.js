import { MENU_ITEMS } from "@/constants";
import {useEffect, useLayoutEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionItemClick } from "@/slice/menuSlice";


const Board=()=>{
    const canvasRef = useRef(null);
    const {activeMenuItem,actionMenuItem} = useSelector((state)=>state.menu);
    const {color,size} = useSelector((state)=>state.toolbox[activeMenuItem]);
    const dispatch  =  useDispatch();
    const shouldDraw = useRef();

useLayoutEffect(()=>{
    if(!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d');
    context.fillStyle = "white";
    context.fillRect(0,0,canvas.width,canvas.height);
},[])

useEffect(() => {
    console.log("inside actionMenuItem")
  if (!canvasRef.current) return;
  console.log("actionmenu",actionMenuItem);
  const canvas = canvasRef.current;
  
  if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
    const URL = canvas.toDataURL();
    const anchor = document.createElement('a');
    anchor.href = URL;
    anchor.download= 'sketch.jpg';
    anchor.click();
    console.log("this is",URL);
    dispatch(actionItemClick(null));
  }
}, [actionMenuItem]);



useEffect(()=>{

    if(!canvasRef.current) return
    const canvas = canvasRef.current;
    const context  = canvas.getContext('2d');
   const changeConfig=()=>{
    context.strokeStyle = color;
    context.lineWidth =size;
   }
    changeConfig();

   const handleMouseDown=(e)=>{
    shouldDraw.current = true
     context.beginPath()
     context.moveTo(e.clientX,e.clientY);
   }

   const handleMouseMove=(e)=>{
    if(!shouldDraw.current) return
    context.lineTo(e.clientX,e.clientY)
    context.stroke()
   }
   const handleMouseUp=(e)=>{
    shouldDraw.current = false;
 
   }

   canvas.addEventListener('mousedown',handleMouseDown);
   canvas.addEventListener("mousemove", handleMouseMove);
   canvas.addEventListener('mouseup',handleMouseUp);

   return ()=>{
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mousemove", handleMouseMove);
    canvas.removeEventListener("mouseup", handleMouseUp);

   }

},[color,size])

console.log(color,size);

    return (
        <canvas style={{backgroundColor:"white",overflow:"hidden", boxSizing:"border-box"}} ref={canvasRef}></canvas>
    )
}

export default Board