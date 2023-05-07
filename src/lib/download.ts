import store from "../appVue/store";

export async function downloadAndroidIOS(filename: string, text: string): Promise<void> {
    let blob = new Blob([text], { type: "application/json" });
    (cordova.plugins as any).saveDialog.saveFile(blob, filename).then((uri: string) => {
        console.info("The file has been successfully saved to", uri);
    }).catch((err: Error) => {
        store.commit.showError({err, text: "fail to save file"})
    });

}

export function downloadWeb(filename: string, text: string) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}