<template>
  <v-dialog max-width="420">
    <template #activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Advanced Search</v-card-title>
      <v-card-text>
        You can use special keywords to perform advanced searches. Use them like
        <span class="font-italic font-weight-bold">inauthor:King</span> (i.e. <span class="font-italic">with</span> the
        colon)
        <ul>
          <li v-for="[keyword, text] in keywords" :key="keyword">
            <span class="font-weight-bold">{{ keyword }}:</span>
            {{ text }}
          </li>
        </ul>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: () => ({
    keywords: [
      ['intitle', 'Returns results where the text following this keyword is found in the title.'],
      ['inauthor', 'Returns results where the text following this keyword is found in the author.'],
      ['inpublisher', 'Returns results where the text following this keyword is found in the publisher.'],
      [
        'subject',
        'Returns results where the text following this keyword is listed in the category list of the volume.'
      ],
      ['isbn', 'Returns results where the text following this keyword is the ISBN number.'],
      ['lccn', 'Returns results where the text following this keyword is the Library of Congress Control Number.'],
      ['oclc', 'Returns results where the text following this keyword is the Online Computer Library Center number.']
    ]
  })
})
</script>
