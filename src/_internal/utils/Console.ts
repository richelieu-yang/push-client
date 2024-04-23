import {type Ref} from "vue";

export class Console {
    private static outputTextarea: Ref<string>;

    static initialize(output: Ref<string>) {
        this.outputTextarea = output;
    }

    static println(text: string) {
        let str: string = `${this.getTimeString()} ${text}\n`;

        this.outputTextarea.value += str;
        console.log(str);
    }

    static clear() {
        this.outputTextarea.value = "";
    }

    private static getTimeString(): string {
        let d: Date = new Date(),
            text: string = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`

        return text.padEnd(22, " ");
    }
}