<template>
  <div class="wrap">
    <div
      :class="[
        'wrap_browser_file',
        dragging ? 'drag_over' : '',
        waringUpload ? 'waring_upload' : '',
      ]"
      @dragenter="dragging = true"
      @dragleave="dragging = false"
    >
      <div class="center" @drag="handleChangeFile">
        <img
          @click="handleUpload"
          class="cloud_icon"
          src="../assets/upload2.png"
        />
        <div class="file_info">
          <h2 class="browser_file_title">Drag and drop files</h2>
          <label for="file" class="browser_file">Browser files</label>
        </div>
      </div>
      <input
        @change="handleChangeFile"
        class="file_input"
        type="file"
        id="file"
      />
    </div>
    <p class="waring_upload_notify">{{ waringUpload }}</p>
    <div class="wrap_fileItems">
      <div class="wrap_fileItem" ref="fileItem">
        <FileItem
          v-for="(file, index) in files"
          :key="index"
          :file="file"
          :index="index"
          :type="'word'"
          @onDelete="handleOnDelete"
        />
      </div>
    </div>
    <i @click="handlePrev" class="fa-solid fa-angle-left button_prev"></i>
    <i @click="handleNext" class="fa-solid fa-angle-right button_next"></i>
  </div>
</template>

<script>
import FileItem from "./FileItem.vue";
import { storage } from "../utils/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export default {
  data() {
    return {
      files: [],
      dragging: false,
      waringUpload: "",
      left: 0,
      indexSlide: 0,
    };
  },

  methods: {
    handleOnDelete(index) {
      this.files.splice(index, 1);
    },
    handleChangeFile(e) {
      const files = e.target.files || e.dataTransfer.files;
      const extentions = files[0].name.substring(files[0].name.lastIndexOf('.')+1, files[0].name.length) || files[0].name;
      // validate
      if (!files.length) {
        this.dragging = false;
      } else if (
        extentions === "docx" ||
        extentions === "xlsx" ||
        extentions === "pdf" ||
        extentions === "jpg" ||
        extentions === "png"
      ) {
        this.createFile(files[0]);
      } else if (files[0].size > 10000000) {
        this.waringUpload = "The maximum file size is 10 MB";
      } else {
        this.waringUpload = "Vui l??ng ch???n t???p word, excel, png, jpg, pdf.";
      }
    },
    handleUpload() {
      if (this.files.length > 0 && this.files.length < 6) {
        this.files.forEach((file, i) => {
          this.upload(file.name, file, i);
        });
        this.waringUpload = "";
      } else if (this.files.length >= 6) {
        this.waringUpload = "Vui l??ng ch???n s??? file nh??? h??n 6";
      } else {
        this.waringUpload = "Vui l??ng ch???n file";
      }
    },
    handleNext() {
      if (this.indexSlide < this.files.length - 3) {
        this.indexSlide += 1;
        const left = (this.left -= 286);
        this.$refs.fileItem.style.left = left + "px";
      }
    },
    handlePrev() {
      if (this.indexSlide > 0) {
        this.indexSlide -= 1;
        const left = (this.left += 286);
        this.$refs.fileItem.style.left = left + "px";
      }
    },
    upload(name, file) {
      // id v4 rename file
      const imageRef = ref(storage, `myStore/${name}${v4()}`);
      uploadBytes(imageRef, file).then(() => {
        this.files.forEach((item, index) => {
          if (item.name === name) {
            this.files.splice(index, 1);
            this.indexUpload = name;
          }
        });
      });
    },
    createFile(file) {
      this.files = [...this.files, file];
      this.dragging = false;
      this.waringUpload = "";
    },
  },
  components: {
    FileItem,
  },
  watch: {},
};
</script>

<style  scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.wrap {
  position: relative;
  max-width: 842px;
  margin: 0 auto;
}
.list_drop {
  display: flex;
  width: 100%;
  height: 48px;
  margin: 12px;
  gap: 8px;
  justify-content: center;
}
.drag_over.wrap_browser_file {
  background-color: #ccc;
}
.waring_upload.wrap_browser_file {
  border: 1px solid #ed5d5d;
}
.wrap_browser_file {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 232px;
  background-color: #f8f8f8;
  border: 1px solid #dcdcdc;
  border-radius: 7px;
}
.wrap_fileItem {
  position: relative;
  max-width: 842px;
  margin: 33px auto;
  display: inline-flex;
  gap: 17px;
  transition: 0.5s;
}
.wrap_fileItem::-webkit-scrollbar {
  display: none;
}
.browser-file_title {
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  width: 100%;
}
.file_input {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  opacity: 0;
}
.browser_file {
  display: block;
  margin-top: 6px;
  font-size: 18px;
  line-height: 22px;
  text-decoration: underline;
}
.cloud_icon {
  position: relative;
  margin-bottom: 20px;
  z-index: 10;
  padding: 20px 20px 0 20px;
  cursor: pointer;
}
.file_info {
  margin-bottom: 10px;
}
.button_next {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: -18px;
  bottom: 40px;
  color: #fff;
  background-color: rgba(98, 125, 152, 0.7);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
}
.button_prev {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: -18px;
  bottom: 40px;
  color: #fff;
  background-color: rgba(98, 125, 152, 0.7);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
}
.waring_upload_notify {
  max-width: 842px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #ed5d5d;
  text-align: left;
}
.center {
  text-align: center;
}
.wrap_fileItems {
  position: relative;
  overflow-x: hidden;
  max-width: 842px;
  margin: 6px auto;
  transition: 0.4s;
}
</style>