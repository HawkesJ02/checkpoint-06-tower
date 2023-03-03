<template>
  <div class="card p-3 my-3">
    <div><img :src="account.picture" class="profile-picture">
      <form @submit.prevent="handle_submit">
        <div class="">
          <label for="body" class="form-label"></label>
          <input type="text" v-model="editable.name" class="form-control" id="name" placeholder="Event Name..."
            name="name">
        </div>
        <label for="Img" class="form-label"></label>
        <input type="text" v-model="editable.coverImg" class="form-control" id="coverImg" placeholder="Image URL..."
          name="coverImg">
        <label for="location" class="form-label"></label>
        <input type="text" v-model="editable.location" class="form-control" id="location" placeholder="Location..."
          name="location">
        <label for="startDate" class="form-label"></label>
        <input type="text" v-model="editable.startDate" class="form-control" id="startDate"
          placeholder="When's this event starting?..." name="startDate">
        <label for="description" class="form-label"></label>
        <textarea name="description" id="description" v-model="editable.description" cols="20" rows="5"
          placeholder="What's the event?" class="form-control"></textarea>
        <label for="capacity" class="form-label"></label>
        <input type="number" v-model="editable.capacity" class="form-control" id="capacity" placeholder="Capacity...?"
          name="name">

        <label for="type" class="form-label">Type:</label>
        <select name="type" v-model="editable.type" id="type">
          <option value="sport">Sport</option>
          <option value="concert">Concert</option>
          <option value="convention">Convention</option>
          <option value="digital">Digital</option>
        </select>

        <div class="d-flex flex-row-reverse mb-2">
          <button type="submit" class="btn btn-primary"> Create Event
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import { ref, computed } from "vue";
import { router } from "../router.js";
import { eventsService } from "../services/EventsService";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop";
export default {
  setup() {

    const editable = ref({})

    return {
      editable,
      account: computed(() => AppState.account),
      async handle_submit() {
        try {
          await eventsService.create_event(editable.value)
          editable.value = {}
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.profile-picture {
  height: 5vh;
  width: 5vh;
  border-radius: 50%;
  box-shadow: 2px 2px 4px black;
}
</style>