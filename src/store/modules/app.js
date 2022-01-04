import { LANG, TAGS_VIEW } from '@/constant'
import { getItem, setItem } from '@/utils/storage'
export default {
    namespaced: true,
    state: () => ({
        tagsViewList: getItem(TAGS_VIEW) || []
    }),
    mutations: {
        /* 添加 tags */
        addTagsViewList(state, tag) {
            const isFind = state.tagsViewList.find(item => {
                return item.path === tag.path
            })

            /* 处理重复 */
            if (!isFind) {
                state.tagsViewList.push(tag)
                setItem(TAGS_VIEW, state.tagsViewList)
            }
        },
    },
    actions: {

    }
}
/* export default {
    namespaced: true,
    state: () => ({
        ...
        tagsViewList: getItem(TAGS_VIEW) || []
    }),
    mutations: {
        ...
        /**
         * 添加 tags
         */
/*         addTagsViewList(state, tag) {
            const isFind = state.tagsViewList.find(item => {
                    return item.path === tag.path
                })
                // 处理重复
            if (!isFind) {
                state.tagsViewList.push(tag)
                setItem(TAGS_VIEW, state.tagsViewList)
            }
        }
    },
    actions: {}
} */