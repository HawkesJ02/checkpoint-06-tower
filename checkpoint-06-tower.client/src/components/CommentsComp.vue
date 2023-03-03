<template>
  <div>
    <div v-for="c in comments" class="p-3">
      <div class=" d-flex flex-row">
        {{ c.creator.name }} wrote: {{ c.body }}
        <button @click="delete_comment(c.id)" v-if="c.creatorId == account.id" class="btn btn-danger"> <i
            class="mdi mdi-trash-can">Delete
            Comment</i></button>
      </div>
    </div>
  </div>

  <div class="mb-3">
    <form @submit.prevent="handle_submit">
      <div class="input-group mb-3">
        <input type="text" v-model="editable.body" id="body" class="form-control" placeholder="Write comment here!"
          aria-label="Comment body">
        <div class="input-group-append">
          <button class="btn btn-primary" type="submit">POST!</button>
        </div>
      </div>
    </form>

  </div>
</template>


<script>
import { AppState } from "../AppState";
import { watchEffect } from "vue";
import { Comment } from "../models/Comment";
import { commentsService } from '../services/CommentsService'
import { computed, ref } from 'vue';
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { useRoute } from "vue-router";



export default {
  setup() {
    const editable = ref({})
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
      editable,
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      events: computed(() => AppState.events),

      async delete_comment(comment_id) {
        try {
          if (await Pop.confirm()) {
            await commentsService.delete_comment(comment_id)
          }
        } catch (error) {
          Pop.error(error.message)
          logger.error(error)
        }
      },

      async handle_submit() {
        try {
          const comment_data = editable.value
          comment_data.eventId = route.params.id
          await commentsService.create_comment(comment_data)
          editable.value = {}
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>