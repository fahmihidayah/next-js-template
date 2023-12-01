import { Box, Button, ButtonProps, FlexProps, Icon, Text } from "@chakra-ui/react";
import {AiOutlineArrowRight, AiOutlineArrowLeft} from "react-icons/ai"

interface BoxNumberProps extends ButtonProps {
    text : string;
    action : string;
    isActive : boolean;
    buttonType : "page" | "start" | "end"
}

export default function BoxNumber({text, buttonType, isActive, ... rest} : BoxNumberProps) {
    return <Button variant={isActive ? "solid" :"ghost"} colorScheme={isActive? "blue" : "gray"} width={10} height={10} {... rest}>
        {text}
    </Button>

}