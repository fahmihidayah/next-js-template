import { Box, Button, Icon, Text } from "@chakra-ui/react";
import {AiOutlineArrowRight, AiOutlineArrowLeft} from "react-icons/ai"

interface BoxNumberProps {
    text : string;
    action : string;
    isActive : boolean;
    type : "page" | "start" | "end"
}

export default function BoxNumber({text, type, isActive} : BoxNumberProps) {
    return <Button variant={isActive ? "solid" :"ghost"} colorScheme={isActive? "blue" : "gray"} width={10} height={10}>
        {text}
    </Button>

}