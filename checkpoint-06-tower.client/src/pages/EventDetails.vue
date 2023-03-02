<template>
  <div class="component">
    <div class="container">
      <div class="row">
        <div class="col-12">
          {{ events.name }}
          {{ events.description }}
        </div>
        <div class="col-12">
          <button @click="cancel_selected_event()" class="btn btn-danger">CANCEL EVENT</button>
          <button @click="create_ticket()" class="btn btn-info">Get Tickets</button>
          <!-- {{ tickets.profile.name }} -->
          <div v-for="t in tickets" class="col-4">
            <img class="img-fluid" :src="t.profile.picture" :alt="t.profile.name + ' picture'" :title="t.profile.name">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <CommentsComp />
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import { onMounted } from "vue";
import { watchEffect } from "vue";
import { onUnmounted } from "vue";
import { computed } from "vue";
import { ticketsService } from '../services/TicketsService';
import { eventsService } from "../services/EventsService";
import { commentsService } from "../services/CommentsService";
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
        await ticketsService.get_selected_event_tickets(event_id)
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)
      }
    }

    watchEffect(() => {
      get_selected_event();
      get_selected_event_tickets();
    })

    onUnmounted(() => {
      eventsService.dump_events();
      ticketsService.dump_tickets();
      commentsService.dump_comments();
    })
    return {
      events: computed(() => AppState.events),
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),

      async cancel_selected_event() {
        try {
          const event_id = route.params.id
          logger.log(event_id, 'EVENT ID')
          if (await Pop.confirm()) {
            await eventsService.cancel_selected_event(event_id)
          }
        } catch (error) {
          Pop.error(error.message)
          logger.error(error)
        }
      },

      async create_ticket() {
        try {
          const event_id = route.params.id
          logger.log('event id for ticket', event_id)
          await ticketsService.create_ticket(event_id)
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