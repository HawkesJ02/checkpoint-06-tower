<template>
  <div class="component">
    <div class="container">
      <div class="row">
        <div class="col-12">
          {{ events.name }}
          {{ events.description }}
        </div>
        <div class="col-12">
          <button @click="cancel_selected_event(events.id)" class="bt">CANCEL EVENT</button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">

        </div>
      </div>
    </div>

  </div>
</template>


<script>
import { onMounted } from "vue";
import { onUnmounted } from "vue";
import { computed } from "vue";
import { eventsService } from "../services/EventsService";
import { logger } from "../utils/Logger";
import { useRoute } from "vue-router";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
export default {
  setup() {
    const route = useRoute()
    async function get_selected_event() {
      try {
        const event_id = route.params.id;
        await eventsService.get_selected_event(event_id)
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)
      }
    }


    async function get_selected_event_tickets() {
      try {
        const event_id = route.params.id
        logger.log(event_id)
        await eventsService.get_selected_event_tickets(event_id)
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)
      }
    }

    onMounted(() => {
      get_selected_event();
      get_selected_event_tickets();
    })

    onUnmounted(() => {
      eventsService.dump_events();
    })
    return {
      events: computed(() => AppState.events),

      async cancel_selected_event() {
        try {
          const event_id = route.params.id
          if (await Pop.confirm()) {
            await eventsService.cancel_selected_event(event_id)
          }
        } catch (error) {
          Pop.error(error.message)
          logger.error(error)
        }
      }

    }
  },
}
</script>


<style lang="scss" scoped></style>