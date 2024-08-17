import { ref, onMounted, onBeforeUnmount } from 'vue';

function useCollapse() {
    const isCollapsed = ref(window.innerWidth <= 768);

    const handleResize = () => {
        if (window.innerWidth > 768) {
            isCollapsed.value = false;
        } else {
            isCollapsed.value = true;
        }
    };

    onMounted(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize);
    });

    return { isCollapsed };
}

export default useCollapse;