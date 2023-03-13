<template>
  <div v-if="events" class="component">
    <div class="container-fluid card mt-3">
      <div class="row">
        <div class="col-5 p-0">
          <img v-if="events.isCanceled == false" class="img-fluid" :src="events.coverImg" alt="">
          <img v-else class="img-fluid event-img-c" :src="events.coverImg" alt="">
        </div>
        <div class="col-7">
          <div class="row justify-content-between">
            <div class="col-6 fs-2"> {{ events.name }} </div>
            <div class="col-6 text-end"> Starts: {{ events.startDate }} </div>
          </div>
          <div class="row justify-content-between">
            <div class="col-6 fs-5"> Where?: {{ events.location }} </div>
          </div>
          <div class="row">
            <div class="col-12">
              <b>{{ events.type }}</b>
              <div class="py-2">
                {{ events.description }}
              </div>

            </div>
          </div>
          <div class="row mt-5 justify-content-between">
            <div v-if="events.isCanceled == false" class="col-6 text-start"> Capacity left: {{ events.capacity }}</div>
            <div v-else class="col-6 text-start"> <span class="fs-2 text-danger"> EVENT IS CANCELLED!</span> </div>
            <div class="col-6 text-end">
              <button v-if="events.isCanceled == true || events.capacity == 0" class="btn btn-danger">Event is
                unavailable</button>
              <button v-if="events.isCanceled == false && events.capacity >= 1 && !foundTicket" @click="create_ticket()"
                class="btn btn-info">Get
                Tickets</button>
              <!-- <div v-for="t in tickets">
                <div v-if="t.accountId === account.id">hi</div>
                <div v-else>REEEAA</div>
              </div> -->
              <button v-if="events.creatorId === account.id && events.isCanceled == false"
                @click="cancel_selected_event()" class="btn btn-danger">CANCEL
                EVENT</button>
            </div>
          </div>

        </div>


      </div>
    </div>
    <div class="container-fluid p-0 my-3 card">
      <div class="d-flex flex-row">
        <div v-for="t in tickets" class="p-2 profile-picture">
          <img class="img-fluid" :src="t.profile.picture" :alt="t.profile.name + ' picture'" :title="t.profile.name">
          <button @click="delete_ticket(t.id)" v-if="t.accountId == account.id">Revoke Ticket</button>
        </div>

      </div>
    </div>
    <div class="container-fluid p-0">
      <div class="card">
        <!-- TODO LOOK HERE! -->
        <CommentsComp :comments="comments" />
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

    // onUnmounted(() => {
    //   eventsService.dump_events();
    //   ticketsService.dump_tickets();
    //   commentsService.dump_comments();
    // })
    return {
      events: computed(() => AppState.event),
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
      foundTicket: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id)),

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
      },

      async delete_ticket(ticketId) {
        try {
          await ticketsService.delete_ticket(ticketId)
        } catch (error) {
          Pop.error(error.message)
          logger.error(error)
        }
      }

    }
  },
}
</script>


<style lang="scss" scoped>
.profile-picture {
  height: 8vh;
  width: 8vh;
  border-radius: 50%;
}

.event-img-c {
  filter: blur(6px);
}
</style>