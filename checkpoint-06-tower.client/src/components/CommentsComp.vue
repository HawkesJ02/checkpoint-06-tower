<template>
  <div class="component">
    <div v-for="c in comments">
      {{ c.body }}
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { watchEffect } from "vue";
import { Comment } from "../models/Comment";
import { commentsService } from '../services/CommentsService'
import { computed } from 'vue';
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { useRoute } from "vue-router";


export default {
  setup() {
    const route = useRoute();
    async function get_comments_on_event() {
      try {
        const eventId = route.params.id
        await commentsService.get_comments_on_event(eventId)
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)
      }
    }

    watchEffect(() => {
      get_comments_on_event();
    })

    return {
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      events: computed(() => AppState.events)
    }
  }
}
</script>


<style lang="scss" scoped></style>