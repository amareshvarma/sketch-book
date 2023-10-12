import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "@/constants";
import {changeColor,changeBrushSize} from "@/slice/toolBox";

const Toolbox=()=>{
    const dispatch = useDispatch();
    const activeMenuItem = useSelector((state)=>state.menu.activeMenuItem);
    const showStrokeToolOption  = activeMenuItem === MENU_ITEMS.PENCIL;
    const showBrushToolOption = activeMenuItem === MENU_ITEMS.PENCIL||activeMenuItem.ERASER
    const updateBrushSize = (e) => {
      dispatch(changeBrushSize({item:activeMenuItem,size:e.target.value}))
    };

    const updateColor=(newColor)=>{
      dispatch(changeColor({item:activeMenuItem,color:newColor}))
    }

    return (
      <>
        <div className={styles.toolboxContainer}>
          {showStrokeToolOption && (
            <div className={styles.toolItem}>
              <h4 className={styles.toolText}>Stroke Color</h4>
              <div className={styles.itemContainer}>
                <div
                  className={styles.colorBox}
                  style={{ backgroundColor: COLORS.BLACK }}
                  onClick={() => updateColor(COLORS.BLACK)}
                />
                <div
                  className={styles.colorBox}
                  style={{ backgroundColor: COLORS.BLUE }}
                  onClick={() => updateColor(COLORS.BLUE)}
                />
                <div
                  className={styles.colorBox}
                  style={{ backgroundColor: COLORS.GREEN }}
                  onClick={() => updateColor(COLORS.GREEN)}
                />
                <div
                  className={styles.colorBox}
                  style={{ backgroundColor: COLORS.RED }}
                  onClick={() => updateColor(COLORS.RED)}
                />
                <div
                  className={styles.colorBox}
                  style={{ backgroundColor: COLORS.YELLOW }}
                  onClick={() => updateColor(COLORS.YELLOW)}
                />
              </div>
            </div>
          )}

          <div>
            <h4>Brush Size</h4>
            <div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                onChange={updateBrushSize}
              />
            </div>
          </div>
        </div>
      </>
    );
}


export default Toolbox;