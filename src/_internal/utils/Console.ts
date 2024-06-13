import {type Ref} from "vue";
import {TimeKit} from "@/_chimera/time/TimeKit";

export class Console {
    private static outputTextarea: Ref<string>;

    static initialize(output: Ref<string>) {
        this.outputTextarea = output;
    }

    static println(text: string) {
        let str: string = `${TimeKit.getCurrentTimeString()} ${text}\n`;

        this.outputTextarea.value += str;
        console.log(str);
    }

    static clear() {
        this.outputTextarea.value = "";
    }

}