<template>
    <div id="results-modal" class="modal-background">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Previous results</h4>
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" class="btn-check" name="btnradio" id="all-btn" autoComplete="off" />
          <label class="btn btn-outline-primary" htmlFor="all-btn">All</label>
          <input type="radio" class="btn-check" name="btnradio" id="time-map-btn" autoComplete="off" />
          <label class="btn btn-outline-primary" htmlFor="time-map-btn">Time Map</label>
          <input type="radio" class="btn-check" name="btnradio" id="query-btn" autoComplete="off" />
          <label class="btn btn-outline-primary" htmlFor="query-btn">Query</label>
        </div>
        <button class="btn btn-danger btn-md" id="result-btn" @click="() => { }">Delete All</button>
        <button class="modal-close" @click="$emit('close')">&times;</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-background {
  position: fixed;
  z-index: 3000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto;
  /* 15% from the top and centered */
  padding: 20px;
  width: 80%;
  /* Could be more or less, depending on screen size */
  border-radius: 6px;
  height: 75%;
}

.modal-content-small {
  background-color: #fefefe;
  margin: 15% auto;
  /* 15% from the top and centered */
  padding: 20px;
  width: 40%;
  /* Could be more or less, depending on screen size */
  border-radius: 6px;
}

.modal-close-container {
  display: flex;
  justify-content: flex-end;
}

.modal-close {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  align-self: flex-end;
  border: none;
  background: none;
}

.modal-close:hover, .modal-close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.results-container {
  overflow-y: scroll;
}

.modal-header {
  border-bottom: 0;
}
</style>
