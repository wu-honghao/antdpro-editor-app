import '@wangeditor/editor/dist/css/style.css' // 引入 css

import type { FC } from 'react';
import { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig, SlateText } from '@wangeditor/editor'
import { DataNode } from 'antd/lib/tree';
import { v4 as uuidv4 } from 'uuid';

// 根据h1-h5切割数组
const convert = (raw: { type?: any; children: SlateText[] }) => {
    return {
        title: raw.children[0].text,
        type: raw.type,
        children: [],
        id: uuidv4(),
    }
};
const isHeader = (type: string) => {
    if (!type) { return "" }
    return type.replace(/[^0-9]/ig, "");
}
const isParent = (type1: string, type2: string) => {
    return parseInt(isHeader(type1)) + 1 === parseInt(isHeader(type2));
};
const isGte = (type1: string, type2: string) => {
    return parseInt(isHeader(type1)) >= parseInt(isHeader(type2));
};
const isEqual = (type1: string, type2: string) => {
    return parseInt(isHeader(type1)) === parseInt(isHeader(type2));
};
const recurse = (node: { title?: string; type: string; children: any; id?: string; }, arr: string | any[]) => {
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (isParent(node.type, item.type)) {
            const convertedItem = convert(item);
            node.children.push(convertedItem);
            recurse(convertedItem, arr.slice(i + 1));
        }
        if (isGte(node.type, item.type)) break;
    }
};
const createTree = (arr: { type: string; children: any; }[]) => {
    const result = [];
    const head = arr[0];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (isEqual(head.type, item.type)) {
            const converedItem = convert(item);
            result.push(converedItem);
            recurse(converedItem, arr.slice(i + 1));
        }
    }

    return result;
};

interface Iprops {
    setTreeFunc?: Function
}
const MyEditor: FC<Iprops> = (props: Iprops) => {
    const { setTreeFunc } = props
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)

    // 编辑器内容
    const [html, setHtml] = useState('<p>hello</p>')

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        setTimeout(() => {
            setHtml('<p>hello world</p>')
        }, 1500)
    }, [])

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {}

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入内容...',
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                    onChange={editor => {
                        if (setTreeFunc) {
                            setTreeFunc(createTree(editor.children))
                        }
                    }}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
        </>
    )
}

export default MyEditor