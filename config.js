import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default {
  plugins: [
    AutoImport({
      resolvers: [],
    }),
    Components({
      resolvers: [],
    }),
  ],
}