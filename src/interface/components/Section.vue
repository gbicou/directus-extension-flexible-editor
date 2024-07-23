<script>
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },

  props: nodeViewProps,

  methods: {
    setKind(kind) {
      this.updateAttributes({
        kind: kind,
      })
    },
  },
}
</script>

<template>
  <node-view-wrapper class="vue-section" :data-kind="node.attrs.kind">
    <header>
      Section
      <label>
        <input type="radio" value="complement" :checked="node.attrs.kind === 'complement'" @input="setKind($event.target.value)" />
        Voir également
      </label>
      <label>
        <input type="radio" value="reminder" :checked="node.attrs.kind === 'reminder'" @input="setKind($event.target.value)" />
        En savoir plus
      </label>
      <label>
        <input type="radio" value="practical" :checked="node.attrs.kind === 'practical'" @input="setKind($event.target.value)" />
        Pratique
      </label>
      <label>
        <input type="radio" value="emphasis" :checked="node.attrs.kind === 'emphasis'" @input="setKind($event.target.value)" />
        Important
      </label>
      <label>
        <input type="radio" value="example" :checked="node.attrs.kind === 'example'" @input="setKind($event.target.value)" />
        Exemple
      </label>
    </header>

    <node-view-content class="content-dom" />
  </node-view-wrapper>
</template>

<style scoped>
/* Vue component */
.vue-section {
  --section-color: #666;
  border: 2px solid var(--section-color);
  border-radius: 0.5rem;
  margin: 2rem 0;
  position: relative;


  header {
    background-color: var(--section-color);
    border-radius: 0 0 0.5rem 0;
    color: var(--white);
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    position: absolute;
    top: 0;

    label {
      margin-left: 1em;
      display: inline-block;
    }
  }

  &[data-kind="emphasis"] {
    --section-color: var(--red);
  }

  &[data-kind="example"] {
    --section-color: var(--green);
  }

  &[data-kind="practical"] {
    --section-color: var(--blue);
  }

  .content {
    margin-top: 1.5rem;
    padding: 1rem;
  }

  .content-dom {
    margin-top: 2rem;
    padding: 1rem;

    & > * ~ * {
      margin-top: var(--editor-block-mt);
    }
  }
}

</style>
