<template>
  <n-upload :show-file-list="false" accept=".pdf" :custom-request="onUpload" style="width: auto">
    <n-button secondary strong type="warning" title="Import">
      <template #icon>
        <n-icon>
          <FileUp />
        </n-icon>
      </template>
    </n-button>
  </n-upload>
</template>

<script setup lang="ts">

import * as pdfjs from "pdfjs-dist";
pdfjs.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

import type { UploadCustomRequestOptions } from "naive-ui";
import { FileUp } from "lucide-vue-next";
import { character } from "../../store/store";
import { assign } from "lodash";

const onUpload = async ({ file }: UploadCustomRequestOptions) => {
  try {
    // Create a blob URL for the PDF file
    const blobUrl = URL.createObjectURL(file.file as File);
    // Load the PDF file
    const doc = pdfjs.getDocument(blobUrl);
    const pdf = await doc.promise;
    const page = await pdf.getPage(2);
    const text = await page.getTextContent();
    // Format the text content
    const string = text.items.map((item: any) => item.str).join(" ");
    const cleaned = string.split("rawjsondump:")[1].replace(/\s{2,}/g, " ");
    // Update the store
    if (cleaned.length) assign(character, JSON.parse(cleaned))
    // Clean up the blob URL
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error extracting text from PDF", error);
  } finally {
  }
}

</script>