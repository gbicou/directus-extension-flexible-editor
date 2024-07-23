import {Editor, mergeAttributes, Node, wrappingInputRule} from '@tiptap/core'
import {defineTool} from "../lib";
import {VueNodeViewRenderer} from "@tiptap/vue-3";
// import customMessages from "../i18n/custom-messages";
import Component from '../components/Section.vue';

export interface SectionOptions {
    /**
     * HTML attributes to add to the section element
     * @default {}
     * @example { class: 'foo' }
     */
    HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        section: {
            /**
             * Set a section node
             */
            setSection: () => ReturnType,
            /**
             * Toggle a section node
             */
            toggleSection: () => ReturnType,
            /**
             * Unset a section node
             */
            unsetSection: () => ReturnType,
        }
    }
}

/**
 * Matches a section to a `>` as input.
 */
export const inputRegex = /^\s*<\s$/

/**
 * This extension allows you to create sections.
 * @see https://tiptap.dev/api/nodes/section
 */
export const Section = Node.create<SectionOptions>({

    name: 'section',

    addOptions() {
        return {
            HTMLAttributes: {},
        }
    },

    addAttributes() {
        return {
            kind: {
                default: '',
            },
        }
    },

    content: 'block+',

    group: 'block',

    // defining: true,

    parseHTML() {
        return [
            { tag: 'section' },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['section', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
    },

    addCommands() {
        return {
            setSection: () => ({ commands }) => {
                return commands.wrapIn(this.name)
            },
            toggleSection: () => ({ commands }) => {
                return commands.toggleWrap(this.name)
            },
            unsetSection: () => ({ commands }) => {
                return commands.lift(this.name)
            },
        }
    },

    addKeyboardShortcuts() {
        return {
            'Mod-Shift-b': () => this.editor.commands.toggleSection(),
        }
    },

    addInputRules() {
        return [
            wrappingInputRule({
                find: inputRegex,
                type: this.type,
            }),
        ]
    },

    addNodeView() {
        return VueNodeViewRenderer(Component)
    },
})

export default defineTool({
    key: "section",
    name: "Section",
    extension: [Section],
    // groups: ["format"],
    shortcut: [],
    action: (editor: Editor) => editor.chain().focus().toggleSection().run(),
    disabled: (editor: Editor) =>
        !editor.can().chain().focus().toggleSection().run(),
    active: (editor: Editor) => editor.isActive("section"),
});
