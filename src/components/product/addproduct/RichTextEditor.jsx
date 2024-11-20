import { CKEditor } from "@ckeditor/ckeditor5-react";
// import Editor from "ckeditor5-custom-build";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export function RichTextEditor(props) {
  const { editorData, setEditorData } = props;
  return (
    <div className="ck-addproduct w-full h-full bg-white mb-4">
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onReady={(editor) => {
          // Insert the toolbar before the editable area.
          editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.getEditableElement()
            );

          this.editor = editor;
        }}
        onError={(error, { willEditorRestart }) => {
          // If the editor is restarted, the toolbar element will be created once again.
          // The `onReady` callback will be called again and the new toolbar will be added.
          // This is why you need to remove the older toolbar.
          if (willEditorRestart) {
            this.editor.ui.view.toolbar.element.remove();
          }
        }}
        onChange={(event, editor) => setEditorData(editor.getData())}
      />
    </div>
  );
}
