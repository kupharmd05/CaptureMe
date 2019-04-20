import axios from "axios";

export default {
    createContact: function(contactData) {
        return axios.post("/api/contacts", contactData);
      }
}