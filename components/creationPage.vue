<template>
  <v-app>
    <v-container fluid class="background w-100 h-100">
      <v-row>
        <!-- maybe move this tot he footer at some point -->
        <!-- <v-row>
        <v-col cols="12" style="text-align: right">
          <div class="ma-2">
            <v-card-subtitle>Enjoying this tool?</v-card-subtitle>
            <v-btn
              href="https://buymeacoffee.com/supplementing
"
              size="small"
              rounded
              variant="tonal"
              color="secondary"
            >
              <v-icon class="mr-3">mdi-coffee-outline</v-icon> Buy Me A
              Coffee</v-btn
            >
          </div>
        </v-col>
      </v-row> -->
        <v-col cols="12">
          <v-card-text style="font-size: 25px; margin-top: 10px">
            <v-icon>mdi-file-plus-outline</v-icon> Generate a landing page in 30
            seconds!</v-card-text
          >
          <v-card-text class="ml-10 mt-5" style="font-size: 18px; opacity: 0.5">
            Simply enter some basic info below to preview and then generate a
            single HTML file to quickly create a business landing page!
          </v-card-text>

          <v-divider thickness="5" class="ma-10"></v-divider>
          <v-card-title>Company Information</v-card-title>

          <v-container fluid>
            <v-text-field
              v-model="companyName"
              label="Company Name"
              placeholder="Enter company name"
            ></v-text-field>
            <!-- <v-file-input
            @change="getLocalImageUrl"
            v-model="companyLogo"
            prepend-inner-icon="mdi-paperclip"
            prepend-icon=""
            accept="image/*"
            label="Company Logo"
          ></v-file-input>

          <img :src="companyLogoURL" alt="" /> -->

            <v-text-field
              v-model="heroTitle"
              label="Hero Title"
              placeholder="Enter hero title"
            ></v-text-field>

            <v-textarea
              v-model="heroSubtitle"
              label="Hero Subtitle"
              placeholder="Enter hero subtitle"
            ></v-textarea>

            <v-textarea
              v-model="aboutText"
              label="About Text"
              placeholder="Enter about text"
            ></v-textarea
          ></v-container>

          <v-card-title v-if="!editFeatures"
            >{{ featuresSectionName }}
            <v-icon @click="editFeatures = true" size="small"
              >mdi-pencil-outline</v-icon
            >
          </v-card-title>
          <v-text-field
            style="width: 20%"
            class="ml-5"
            v-else
            v-model="featuresSectionName"
          >
            <template v-slot:append-inner>
              <v-btn
                text
                @click="editFeatures = false"
                color="success"
                variant="tonal"
                >Save</v-btn
              >
            </template>
            <template v-slot:prepend-inner>
              <v-icon>mdi-pencil-outline</v-icon>
            </template>
          </v-text-field>
          <v-container fluid>
            <v-row>
              <v-col cols="12" xs="12" sm="12" md="12" lg="4">
                <v-text-field
                  v-model="newFeature.text"
                  label="New Feature"
                  placeholder="Enter feature Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="12" lg="4">
                <v-text-field
                  v-model="newFeature.description"
                  label="New Feature Description"
                  placeholder="Enter feature description"
                ></v-text-field>
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="12" lg="3">
                <v-autocomplete
                  v-model="newFeature.icon"
                  :items="iconOptions"
                  item-title="text"
                  item-value="value"
                  label="Select Icon"
                >
                  <template v-slot:selection="{ item }">
                    <v-icon>{{ item.value }}</v-icon>
                  </template>
                  <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props">
                      <div
                        style="display: flex; justify-content: space-between"
                      >
                        <span>
                          <v-icon>{{ item.value }} </v-icon
                          >{{ item.text }}</span
                        >
                      </div>
                      <v-divider class="mt-3"></v-divider>
                    </v-list-item>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" lg="1" xs="12" sm="12" md="12">
                <v-menu
                  v-model="featureMenu"
                  :close-on-content-click="false"
                  location="start"
                >
                  <template v-slot:activator="{ props }">
                    <v-card
                      style="border: 1px solid white"
                      v-bind="props"
                      :color="newFeature.iconColor"
                    >
                      <v-container> Icon Color</v-container>
                    </v-card>
                  </template>

                  <v-card min-width="300">
                    <v-color-picker
                      v-model="newFeature.iconColor"
                      dot-size="25"
                      hide-mode-switch
                      mode="hexa"
                      swatches-max-height="200"
                    ></v-color-picker>
                  </v-card>
                </v-menu>
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="12" lg="12">
                <v-btn
                  class="mt-1"
                  block
                  size="large"
                  rounded
                  variant="tonal"
                  @click="addFeature"
                  color="success"
                  >Add</v-btn
                >
              </v-col>
            </v-row>

            <div class="mt-4" v-if="features.length > 0">
              <v-card-subtitle style="font-size: 15px"
                >Items ({{ features.length }}):</v-card-subtitle
              >
              <v-row class="mt-4"
                ><v-col
                  cols="12"
                  md="3"
                  xs="12"
                  sm="12"
                  lg="3"
                  v-for="(feature, index) in features"
                  :key="index"
                >
                  <v-card
                    color="transparent"
                    class="rounded-lg"
                    style="border: 1px solid white"
                  >
                    <v-card-title>
                      <v-icon :color="feature.iconColor">{{
                        feature.icon
                      }}</v-icon>
                    </v-card-title>
                    <v-card-subtitle style="font-size: 15px; font-weight: bold">
                      {{ feature.text }}</v-card-subtitle
                    >
                    <v-card-text>{{ feature.description }}</v-card-text>
                    <v-card-actions>
                      <v-btn
                        @click="removeFeature(index)"
                        color="error lighten-4"
                        small
                        >Remove</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-col></v-row
              >
            </div></v-container
          >

          <v-card-title>Company Contact Information</v-card-title>
          <v-container fluid>
            <v-text-field
              v-model="contactEmail"
              label="Contact Email"
              placeholder="Enter contact email"
            ></v-text-field>

            <v-text-field
              v-model="contactPhone"
              label="Contact Phone"
              placeholder="Enter contact phone"
            ></v-text-field>
            <v-text-field
              v-model="contactLocation"
              label="Location"
              placeholder="Enter Address or location"
            ></v-text-field>
          </v-container>

          <v-card-title
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
            >Theming
            <v-switch
              style="color: white"
              color="success"
              v-model="isDarkTheme"
              label="Dark Theme"
            ></v-switch
          ></v-card-title>
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="6">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  location="end"
                >
                  <template v-slot:activator="{ props }">
                    <v-card
                      style="border: 1px solid white"
                      :color="primaryColor"
                      v-bind="props"
                    >
                      <v-card-title>Primary Color</v-card-title>

                      <v-card-actions>
                        <v-card-text
                          >The primary color will be used for backgrounds of
                          section, header and footer colors, hero section
                          colors, etc.</v-card-text
                        ></v-card-actions
                      >
                    </v-card>
                  </template>

                  <v-card min-width="300">
                    <v-color-picker
                      v-model="primaryColor"
                      dot-size="25"
                      hide-mode-switch
                      mode="hexa"
                      swatches-max-height="200"
                    ></v-color-picker>
                  </v-card>
                </v-menu>

                <!--  -->
              </v-col>
              <v-col cols="12" md="6">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  location="start"
                >
                  <template v-slot:activator="{ props }">
                    <v-card
                      style="border: 1px solid white"
                      :color="secondaryColor"
                      v-bind="props"
                    >
                      <v-card-title>Secondary Color</v-card-title>
                      <v-card-actions>
                        <v-card-text
                          >The secondary color will be applied to buttons and
                          cards</v-card-text
                        ></v-card-actions
                      >
                    </v-card>
                  </template>

                  <v-card min-width="300">
                    <v-color-picker
                      v-model="secondaryColor"
                      dot-size="25"
                      hide-mode-switch
                      mode="hexa"
                      swatches-max-height="200"
                    ></v-color-picker>
                  </v-card>
                </v-menu>
              </v-col>
              <v-col cols="12" md="6">
                <v-menu
                  v-model="menu3"
                  :close-on-content-click="false"
                  location="end"
                >
                  <template v-slot:activator="{ props }">
                    <v-card
                      style="border: 1px solid white"
                      :color="backgroundColor"
                      v-bind="props"
                    >
                      <v-card-title>Background Color</v-card-title>
                      <v-card-actions>
                        <v-card-text
                          >The background color will be applied to the overall
                          background and be shown on sections where theres no
                          color</v-card-text
                        ></v-card-actions
                      >
                    </v-card>
                  </template>

                  <v-card min-width="300">
                    <v-color-picker
                      v-model="backgroundColor"
                      dot-size="25"
                      hide-mode-switch
                      mode="hexa"
                      swatches-max-height="200"
                    ></v-color-picker>
                  </v-card>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>

          <v-card-title
            class="mt-10"
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
            >Actions Customization
          </v-card-title>
          <v-container fluid>
            <v-text-field
              v-model="ctaText"
              label="Call to Action Text"
              placeholder="Enter call to action text"
              hint="This is the text that will be displayed on the call to action button"
              persistent-hint
            ></v-text-field>

            <v-text-field
              class="mt-2"
              v-model="ctaLink"
              label="Call to Action Link"
              placeholder="Enter call to action link to go to when the button is clicked"
              hint="This can either be a URL to a website, or one of the following: #about, #features, #contact for sections on the page"
              persistent-hint
            ></v-text-field>
          </v-container>
          <v-card-title
            class="mt-10"
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
            >Search Engine Optimization Tags
          </v-card-title>
          <v-container fluid>
            <v-text-field
              v-model="seo"
              label="Add SEO tags to be appended to the head tag"
              placeholder="Enter call to action text"
              hint="Add description paragraph, keywords, etc. These items will show in search engine results and help your site rank"
              persistent-hint
            ></v-text-field>

            <v-btn
              variant="tonal"
              block
              rounded
              size="large"
              class="mt-10"
              @click="generateLandingPage"
              color="success"
              >Generate Landing Page
              <v-icon class="ml-3">mdi-sync</v-icon></v-btn
            >
          </v-container>
          <v-dialog
            max-width="95%"
            width="auto"
            max-height="50%"
            transition="dialog-bottom-transition"
            v-model="showGeneratedHtmlModal"
          >
            <v-card class="rounded-lg" color="primary">
              <v-container fluid>
                <v-card-text style="font-size: 16px">
                  Your landing page has been generated. You can preview it, or
                  download the HTML file.
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    rounded
                    block
                    variant="flat"
                    color="#001b5b"
                    @click="previewDialog = true"
                  >
                    <v-icon left>mdi-eye</v-icon>
                    Preview
                  </v-btn>
                </v-card-actions>
                <v-card-actions>
                  <v-btn
                    rounded
                    block
                    variant="flat"
                    @click="downloadHtml"
                    color="secondary"
                  >
                    <v-icon left>mdi-download</v-icon>
                    Download
                  </v-btn></v-card-actions
                >
              </v-container></v-card
            >
          </v-dialog>

          <v-dialog v-model="previewDialog" fullscreen>
            <v-card>
              <v-card-title
                class="background2"
                style="display: flex; justify-content: space-between"
                >Landing Page Preview
                <v-btn
                  variant="tonal"
                  color="error"
                  text
                  @click="previewDialog = false"
                  >Close</v-btn
                ></v-card-title
              >

              <v-card-text style="background: red; padding: 0px">
                <iframe
                  style="width: 100%; height: 100%"
                  :srcdoc="generatedHtml"
                  title="Landing Page Preview"
                  class="w-100 h-100 preview-iframe"
                ></iframe
              ></v-card-text>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      <v-dialog max-width="600px" v-model="whatsNext">
        <!-- show a card letting the user know theyve downloaded an html file and can either upload it to somewhere to tiiny.host, or they can host it themselves. They can also edit the file as desired if needed -->

        <v-card class="rounded-lg">
          <v-toolbar class="rounded-t-lg" color="primary"
            ><v-toolbar-title class="white--text"
              >What's next?
            </v-toolbar-title></v-toolbar
          >
          <v-container fluid>
            <v-alert type="info" color="success">
              You've now downloaded a single HTML with Vue.js contained in the
              file and I'm sure youre wondering whats next? The good news is you
              have multiple options:</v-alert
            >
            <v-card-actions>
              <v-container>
                <ul>
                  <li>
                    If you are totally happy with it and ready to serve it as a
                    site, we recommend a service like
                    <a href="https://tiiny.host">tiiny.host</a> which allows you
                    to simply upload the downloaded file, choose a domain, and
                    you will have a live web page in seconds.
                  </li>
                  <li>
                    Alternatively, if you want have an existing deployment
                    method such as Github pages, cloudflare, etc, then you can
                    continue to upload it as normal using the defined process
                    there.
                  </li>
                  <li>
                    Finally, if you want to make some more changes, the file has
                    a self-contained instance of Vue.js including Vuetify and
                    Material Design Icons, so you can open it in your favorite
                    code editor, make any desired changes, and then upload it
                    using one of the previously listed choices.
                  </li>
                </ul>
              </v-container>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-dialog>
    </v-container>
    <v-footer class="background2">
      <v-col class="text-center" cols="12">
        &copy {{ new Date().getFullYear() }} —
        <strong
          >Made with <v-icon color="error">mdi-heart</v-icon> by
          Supplementing</strong
        >
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      seo: "",
      featuresSectionName: "Features",
      editFeatures: false,
      showGeneratedHtmlModal: false,
      base64File: null,
      companyLogoURL: null,
      companyLogo: null,
      whatsNext: false,
      menu: false,
      menu2: false,
      menu3: false,
      featureMenu: false,
      companyName: "",
      heroTitle: "",
      heroSubtitle: "",
      features: [],
      newFeature: { text: "", icon: "", iconColor: "#ffffff" },
      primaryColor: "#3490dc",
      secondaryColor: "#02267a",
      backgroundColor: "#ffffff",
      aboutText: "",
      contactEmail: "",
      contactPhone: "",
      contactLocation: "",
      ctaText: "",
      ctaLink: "",
      isDarkTheme: false,
      generatedHtml: "",
      previewDialog: false,
      iconOptions: [
        { text: "Truck", value: "mdi-truck" },
        { text: "Home", value: "mdi-home" },
        { text: "Account", value: "mdi-account" },
        { text: "Settings", value: "mdi-cog" },
        { text: "Email", value: "mdi-email" },
        { text: "Phone", value: "mdi-phone" },
        { text: "Calendar", value: "mdi-calendar" },
        { text: "Camera", value: "mdi-camera" },
        { text: "Heart", value: "mdi-heart" },
        { text: "Star", value: "mdi-star" },
        { text: "Magnify", value: "mdi-magnify" },
        { text: "Cloud", value: "mdi-cloud" },
        { text: "Printer", value: "mdi-printer" },
        { text: "File", value: "mdi-file" },
        { text: "Folder", value: "mdi-folder" },
        { text: "Music", value: "mdi-music" },
        { text: "Shopping Cart", value: "mdi-cart" },
        { text: "Lock", value: "mdi-lock" },
        { text: "Wifi", value: "mdi-wifi" },
        { text: "Bluetooth", value: "mdi-bluetooth" },
        { text: "Airplane", value: "mdi-airplane" },
        { text: "Alert", value: "mdi-alert" },
        { text: "Apple", value: "mdi-apple" },
        { text: "Archive", value: "mdi-archive" },
        { text: "Attachment", value: "mdi-attachment" },
        { text: "Baby", value: "mdi-baby" },
        { text: "Backspace", value: "mdi-backspace" },
        { text: "Bank", value: "mdi-bank" },
        { text: "Battery", value: "mdi-battery" },
        { text: "Bike", value: "mdi-bike" },
        { text: "Book", value: "mdi-book" },
        { text: "Briefcase", value: "mdi-briefcase" },
        { text: "Brush", value: "mdi-brush" },
        { text: "Bug", value: "mdi-bug" },
        { text: "Cake", value: "mdi-cake" },
        { text: "Car", value: "mdi-car" },
        { text: "Cash", value: "mdi-cash" },
        { text: "Cat", value: "mdi-cat" },
        { text: "Chart", value: "mdi-chart-bar" },
        { text: "Check", value: "mdi-check" },
        { text: "Clipboard", value: "mdi-clipboard" },
        { text: "Clock", value: "mdi-clock" },
        { text: "Close", value: "mdi-close" },
        { text: "Coffee", value: "mdi-coffee" },
        { text: "Comment", value: "mdi-comment" },
        { text: "Compass", value: "mdi-compass" },
        { text: "Credit Card", value: "mdi-credit-card" },
        { text: "Crown", value: "mdi-crown" },
        { text: "Delete", value: "mdi-delete" },
        { text: "Diamond", value: "mdi-diamond" },
        { text: "Dog", value: "mdi-dog" },
        { text: "Download", value: "mdi-download" },
        { text: "Earth", value: "mdi-earth" },
        { text: "Edit", value: "mdi-pencil" },
        { text: "Eye", value: "mdi-eye" },
        { text: "Facebook", value: "mdi-facebook" },
        { text: "Fire", value: "mdi-fire" },
        { text: "Flag", value: "mdi-flag" },
        { text: "Flash", value: "mdi-flash" },
        { text: "Food", value: "mdi-food" },
        { text: "Gamepad", value: "mdi-gamepad" },
        { text: "Gift", value: "mdi-gift" },
        { text: "Google", value: "mdi-google" },
        { text: "Hammer", value: "mdi-hammer" },
        { text: "Headphones", value: "mdi-headphones" },
        { text: "Hospital", value: "mdi-hospital" },
        { text: "Image", value: "mdi-image" },
        { text: "Key", value: "mdi-key" },
        { text: "Keyboard", value: "mdi-keyboard" },
        { text: "Laptop", value: "mdi-laptop" },
        { text: "Leaf", value: "mdi-leaf" },
        { text: "Lightbulb", value: "mdi-lightbulb" },
        { text: "Link", value: "mdi-link" },
        { text: "Map", value: "mdi-map" },
        { text: "Medal", value: "mdi-medal" },
        { text: "Microphone", value: "mdi-microphone" },
        { text: "Moon", value: "mdi-moon" },
        { text: "Mouse", value: "mdi-mouse" },
        { text: "Movie", value: "mdi-movie" },
        { text: "Muffin", value: "mdi-muffin" },
        { text: "Nuke", value: "mdi-nuke" },
        { text: "Octagon", value: "mdi-octagon" },
        { text: "Package", value: "mdi-package" },
        { text: "Palette", value: "mdi-palette" },
        { text: "Panda", value: "mdi-panda" },
        { text: "Parking", value: "mdi-parking" },
        { text: "Paw", value: "mdi-paw" },
        { text: "Peace", value: "mdi-peace" },
        { text: "Pepper", value: "mdi-pepper-hot" },
        { text: "Pill", value: "mdi-pill" },
        { text: "Pine Tree", value: "mdi-pine-tree" },
        { text: "Pizza", value: "mdi-pizza" },
        { text: "Playlist", value: "mdi-playlist-music" },
        { text: "Pokeball", value: "mdi-pokeball" },
        { text: "Power", value: "mdi-power" },
        { text: "Puzzle", value: "mdi-puzzle" },
        { text: "Qrcode", value: "mdi-qrcode" },
        { text: "Radar", value: "mdi-radar" },
        { text: "Radioactive", value: "mdi-radioactive" },
        { text: "Rainbow", value: "mdi-rainbow" },
        { text: "Recycle", value: "mdi-recycle" },
        { text: "Reddit", value: "mdi-reddit" },
        { text: "Refresh", value: "mdi-refresh" },
        { text: "Robot", value: "mdi-robot" },
        { text: "Rocket", value: "mdi-rocket" },
        { text: "Ruler", value: "mdi-ruler" },
        { text: "Satellite", value: "mdi-satellite" },
        { text: "School", value: "mdi-school" },
        { text: "Screwdriver", value: "mdi-screwdriver" },
        { text: "Security", value: "mdi-security" },
        { text: "Send", value: "mdi-send" },
        { text: "Shapes", value: "mdi-shape" },
        { text: "Share", value: "mdi-share" },
        { text: "Shield", value: "mdi-shield" },
        { text: "Ship", value: "mdi-ship-wheel" },
        { text: "Shoe", value: "mdi-shoe-heel" },
        { text: "Shopping", value: "mdi-shopping" },
        { text: "Shovel", value: "mdi-shovel" },
        { text: "Shower", value: "mdi-shower" },
        { text: "Skull", value: "mdi-skull" },
        { text: "Sloth", value: "mdi-sloth" },
        { text: "Smoking", value: "mdi-smoking" },
        { text: "Snapchat", value: "mdi-snapchat" },
        { text: "Snowflake", value: "mdi-snowflake" },
        { text: "Soccer", value: "mdi-soccer" },
        { text: "Sofa", value: "mdi-sofa" },
        { text: "Spa", value: "mdi-spa" },
        { text: "Spade", value: "mdi-spade" },
        { text: "Speaker", value: "mdi-speaker" },
        { text: "Speedometer", value: "mdi-speedometer" },
        { text: "Spoon", value: "mdi-spoon-sugar" },
        { text: "Spray", value: "mdi-spray" },
        { text: "Sprout", value: "mdi-sprout" },
        { text: "Square", value: "mdi-square" },
        { text: "Stack", value: "mdi-stack-overflow" },
        { text: "Stairs", value: "mdi-stairs" },
        { text: "Star", value: "mdi-star" },
        { text: "Stethoscope", value: "mdi-stethoscope" },
        { text: "Stocking", value: "mdi-stocking" },
        { text: "Stop", value: "mdi-stop" },
        { text: "Store", value: "mdi-store" },
        { text: "Subway", value: "mdi-subway" },
        { text: "Sun", value: "mdi-white-balance-sunny" },
        { text: "Sunglasses", value: "mdi-sunglasses" },
        { text: "Swim", value: "mdi-swim" },
        { text: "Sword", value: "mdi-sword" },
        { text: "Sync", value: "mdi-sync" },
        { text: "Table", value: "mdi-table" },
        { text: "Tag", value: "mdi-tag" },
        { text: "Target", value: "mdi-target" },
        { text: "Taxi", value: "mdi-taxi" },
        { text: "Tea", value: "mdi-tea" },
        { text: "Television", value: "mdi-television" },
        { text: "Temperature", value: "mdi-thermometer" },
        { text: "Tennis", value: "mdi-tennis" },
        { text: "Tent", value: "mdi-tent" },
        { text: "Test Tube", value: "mdi-test-tube" },
        { text: "Text", value: "mdi-text" },
        { text: "Theatre", value: "mdi-theater" },
        { text: "Thumb Down", value: "mdi-thumb-down" },
        { text: "Thumb Up", value: "mdi-thumb-up" },
        { text: "Ticket", value: "mdi-ticket" },
        { text: "Tie", value: "mdi-tie" },
        { text: "Timer", value: "mdi-timer" },
        { text: "Tooth", value: "mdi-tooth" },
        { text: "Tower", value: "mdi-tower-beach" },
        { text: "Train", value: "mdi-train" },
        { text: "Trash", value: "mdi-trash-can" },
        { text: "Tree", value: "mdi-tree" },
        { text: "Trophy", value: "mdi-trophy" },
        { text: "Umbrella", value: "mdi-umbrella" },
        { text: "Unlock", value: "mdi-lock-open" },
        { text: "Upload", value: "mdi-upload" },
        { text: "Usb", value: "mdi-usb" },
        { text: "Vacuum", value: "mdi-vacuum" },
        { text: "Video", value: "mdi-video" },
        { text: "Virus", value: "mdi-virus" },
        { text: "Volume", value: "mdi-volume-high" },
        { text: "Walk", value: "mdi-walk" },
        { text: "Wallet", value: "mdi-wallet" },
        { text: "Watch", value: "mdi-watch" },
        { text: "Water", value: "mdi-water" },
        { text: "Weather", value: "mdi-weather-cloudy" },
        { text: "Web", value: "mdi-web" },
        { text: "Weight", value: "mdi-weight" },
        { text: "Whistle", value: "mdi-whistle" },
        { text: "Wind", value: "mdi-weather-windy" },
        { text: "Window", value: "mdi-window-maximize" },
        { text: "Wrench", value: "mdi-wrench" },
        { text: "Yin Yang", value: "mdi-yin-yang" },
        { text: "Zip", value: "mdi-zip-box" },
        { text: "Zoom In", value: "mdi-magnify-plus" },
        { text: "Zoom Out", value: "mdi-magnify-minus" },
        { text: "3D", value: "mdi-rotate-3d" },
        { text: "4K", value: "mdi-quality-high" },
        { text: "8K", value: "mdi-quality-high" },
        { text: "Abacus", value: "mdi-abacus" },
        { text: "Ac", value: "mdi-air-conditioner" },
        { text: "Access Point", value: "mdi-access-point" },
        { text: "Accordion", value: "mdi-accordion" },
        { text: "Acid", value: "mdi-flask" },
        { text: "Acorn", value: "mdi-pine-tree" },
        { text: "Adidas", value: "mdi-alpha-a-circle" },
        { text: "Adorable", value: "mdi-emoticon" },
        { text: "Ads", value: "mdi-advertisement" },
        { text: "Adventure", value: "mdi-hiking" },
        { text: "Aerosol", value: "mdi-spray" },
        { text: "Aftershave", value: "mdi-bottle-tonic" },
        { text: "Agender", value: "mdi-gender-male-female" },
        { text: "Agriculture", value: "mdi-tractor" },
        { text: "Aid", value: "mdi-medical-bag" },
        { text: "Aim", value: "mdi-bullseye-arrow" },
        { text: "Air Balloon", value: "mdi-air-balloon" },
      ].sort((a, b) => a.text.localeCompare(b.text)),
    };
  },
  methods: {
    // Function to convert a file to a base64 string
    async fileToBase64(file) {
      var file = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
      });
      return file;
    },

    // Function to convert a base64 string back to a file
    base64ToFile(base64String, filename, mimeType) {
      const arr = Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0));
      const file = new File([arr], filename, { type: mimeType });
      return file;
    },

    async getLocalImageUrl() {
      this.companyLogoURL = URL.createObjectURL(this.companyLogo);
      this.base64File = await this.fileToBase64(this.companyLogo);
      console.log("the base 64 file ", this.base64File);
    },
    addFeature() {
      if (this.newFeature.text.trim() !== "") {
        this.features.push({ ...this.newFeature });
        this.newFeature = {
          text: "",
          icon: "mdi-lightbulb",
          iconColor: "#ffffff",
        };
      }
    },
    removeFeature(index) {
      this.features.splice(index, 1);
    },
    generateLandingPage() {
      const htmlContent = this.generateHtmlContent();
      this.generatedHtml = `
        <!DOCTYPE html>
        <html style="background:${this.backgroundColor}"  lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="description" content="${this.seo}" />
          <title>${this.companyName} - ${this.heroTitle}</title>
          <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
          <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
          <script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"><\/script>
          <script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"><\/script>
          <style>
            [v-cloak] { display: none; }
            v-button{} border-radius:20px;}
            .background{background-color: #f3f3f3;}
          </style>
        </head>
        <body>
          <div id="app" v-cloak>
            ${htmlContent}
          </div>
          <script>
            new Vue({
              el: '#app',
              vuetify: new Vuetify({
                theme: {
                  themes: {
                    light: {
                      primary: '${this.primaryColor}',
                      secondary: '${this.secondaryColor}',
                      background: '${this.backgroundColor}',
                    },
                    dark: {
                      primary: '${this.primaryColor}',
                      secondary: '${this.secondaryColor}',
                      background: '${this.backgroundColor}',
                    },
                  },
                },
              }),
              data: {
                isDarkTheme: ${this.isDarkTheme},
                drawer: false,
           
              },
            
            });
          <\/script>
        </body>
        </html>
      `;
      this.showGeneratedHtmlModal = true;
    },
    generateHtmlContent() {
      return `
        <v-app :dark="isDarkTheme">
          <v-app-bar app color="primary" elevation="1" dark>
    <v-toolbar-title class="white--text">

    ${this.companyName}</v-toolbar-title>
    <v-spacer></v-spacer>
    
    <!-- Desktop menu -->
    <v-btn text href="#about" class="hidden-sm-and-down">About</v-btn>
    <v-btn text href="#features" class="hidden-sm-and-down">${
      this.featuresSectionName
    }</v-btn>
    <v-btn text href="#contact" class="hidden-sm-and-down">Contact</v-btn>
    
    <!-- Mobile menu button -->
    <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
  </v-app-bar>

   <!-- Mobile navigation drawer -->
  <v-navigation-drawer v-model="drawer" absolute temporary right>
    <v-list nav dense>
      <v-list-item-group>
        <v-list-item href="#about">
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>
        <v-list-item href="#features">
          <v-list-item-title>${this.featuresSectionName}</v-list-item-title>
        </v-list-item>
        <v-list-item href="#contact">
          <v-list-item-title>Contact</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>

          <v-main style="background:${this.backgroundColor}">
            <v-container fluid class="fill-height primary">
              <v-row align="center" justify="center">
                <v-col cols="12" sm="12" md="6" class="text-center">
                  <h1 class="text-h2 font-weight-bold white--text mb-4">${
                    this.heroTitle
                  }</h1>
                  <p class="text-h5 white--text mb-8">${this.heroSubtitle}</p>
                  <v-btn x-large color="secondary" href="${this.ctaLink}">${
        this.ctaText
      }</v-btn>
                </v-col>
              </v-row>
            </v-container>

            <v-container  id="about" class="py-12">
              <v-row>
                <v-col style="text-align:center" cols="12" md="8" offset-md="2">
                  <h2 class="text-h3 font-weight-bold mb-6 text-center">About Us</h2>
                  <p class="text-body-1">${this.aboutText}</p>
                </v-col>
              </v-row>
            </v-container>

            <v-container fluid id="features" class="py-12 primary">
              <v-row >
                <v-col cols="12">
                  <h2 class="text-h3 font-weight-bold mb-6 text-center white--text">Our ${
                    this.featuresSectionName
                  }</h2>
                </v-col>
              </v-row>
              <v-row>
                ${this.features
                  .map(
                    (feature) => `
                  <v-col cols="12" sm="6" md="4">
                    <v-card class="rounded-lg" color="secondary" >
                      <v-card-text class="text-center">
                        <v-icon x-large :color="'${feature.iconColor}'">${feature.icon}</v-icon>
                        <h3 style="color:white" class="text-h5 font-weight-bold mt-4">${feature.text}</h3>
                        <span style="color:white"> ${feature.description}</span>
                      </v-card-text>
                    </v-card>
                  </v-col>
                `
                  )
                  .join("")}
              </v-row>
            </v-container>

            <v-container id="contact" class="py-12" >
              <v-row style>
                <v-col cols="12" md="8" offset-md="2" class="text-center">
                  <h2 class="text-h3 font-weight-bold mb-6">Contact Us</h2>
                  <v-list style="background: ${
                    this.backgroundColor
                  };padding-bottom:30px;">
                    <v-list-item>
                 
                      <v-list-item-content>
                        <v-list-item-title>     
                        <v-icon color="primary">mdi-email</v-icon>
                     ${this.contactEmail}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                    
                      <v-list-item-content>
                        <v-list-item-title>   <v-icon color="primary">mdi-phone</v-icon>${
                          this.contactPhone
                        }</v-list-item-title>
                      </v-list-item-content>

                     
                    </v-list-item>
                    <v-list-item>
                    
                      <v-list-item-content>
                        <v-list-item-title>   <v-icon color="primary">mdi-map-marker</v-icon>${
                          this.contactLocation
                        }</v-list-item-title>
                      </v-list-item-content>
                  </v-list>
                </v-col>
              </v-row>
            </v-container>

          


          </v-main>

          <v-footer color="primary" dark app>
            <v-col class="text-center" cols="12">
              &copy; {{ new Date().getFullYear() }} ${
                this.companyName
              }. All rights reserved.
            </v-col>
          </v-footer>
        </v-app>
      `;
    },
    downloadHtml() {
      const blob = new Blob([this.generatedHtml], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "landing_page.html";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      this.showGeneratedHtmlModal = false;
      this.whatsNext = true;
    },
  },
};
</script>

<style scoped>
.preview-iframe {
  width: 100%;
  height: 60vh;
  border: none;
}
.background {
  background-color: #001b5b;
  color: white;
}
.background2 {
  background-color: #001340;
  color: white;
}
v-btn {
  border-radius: 50px;
}
</style>
