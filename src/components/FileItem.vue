<template>
  <div
    draggable="true"
    @dragstart="handleDrag"
    :id="'drag' + index"
    ref="refFile"
  >
    <div class="wrap_file">
      <img
        v-if="extention === 'xlsx'"
        src="../assets/excel.png"
        alt="excel"
        class="file_icon"
      />
      <img
        v-else-if="extention === 'docx'"
        src="../assets/word.png"
        alt="word"
        class="file_icon"
      />
      <img
        v-else-if="extention === 'pdf'"
        src="../assets/pdf.png"
        alt="pdf"
        class="file_icon"
      />
      <img v-else src="../assets/excel (1).png" alt="pdf" class="file_icon" />
      <div class="file_info">
        <h2 class="file_name">{{ file.name }}</h2>
        <p class="file_size">{{ file.size }}kb</p>
      </div>
      <i @click="handleDelete(index)" class="fa-solid fa-xmark close_icon"></i>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleDelete(index) {
      this.$emit("onDelete", index);
    },
    handleDrag(e) {
      e.dataTransfer.setData("text", e.target.id);
    },
  },
  props: {
    file: {
      required: true,
    },
    index: {
      type: Number,
      required: true,
      default: "",
    },
  },
  computed: {
    extention() {
      return this.file.name.split(".")[1];
    },
  },
};
</script>

<style  scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.file_info {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  padding-left: 4px;
}
.wrap_file {
  position: relative;
  display: flex;
  padding: 8px 12px;
  justify-content: space-between;
  align-items: center;
  width: 269px;
  height: 48px;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  transition: 0.5s;
}
.file_name {
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
}
.file_size {
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  display: flex;
  align-items: center;
  color: #666666;
}
.file_icon {
  height: 32px;
}
.close_icon {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(149, 149, 149);
  border-radius: 50%;
  width: 18px;
  font-size: 10px;
  height: 18px;
  color: rgb(149, 149, 149);
  cursor: pointer;
}
.overlay {
  position: absolute;
  display: none;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  line-height: 46px;
  color: #fff;
}
.upload_active .overlay {
  display: block;
}
</style>