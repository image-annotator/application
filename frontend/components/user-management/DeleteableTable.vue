// handleOnDelete (id, name) {
//       if (name) {
//         var text = name + " will be deleted."
//         this.showDeleteConfirmation("Are You Sure?", text).then((result) => {
//           if (result.value) {
//             this.deleteRowContent(id)
//             this.showDeletedAlert()
//           } else {
//             this.showCancelledAlert()
//           }
//         })
//       } else {
//         this.deleteRowContent(id, false)
//       }
//     },

//     showDeleteConfirmation (title, text) {
//       return this.$swal.fire({
//         title: title,
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: 'red',
//         confirmButtonText: 'Yes, delete',
//         text: text
//       })
//     },

//     deleteRowContent (id, isBackend) {
//       for (let idx = 0; idx < this.rows.length; idx++) {
//         if (this.rows[idx].id === id) {
//           this.rows.splice(idx, 1)
//           break
//         }
//       }
//       // TO DO:
//       // Send changes to backend!
//     },

//     showDeletedAlert () {
//       this.$swal.fire({
//         title: 'Successfully Deleted',
//         icon: 'success'
//       })
//     },

.trash-icon:hover {
        color:red; 
    }

    .trash-icon {
        font-size: 0.75rem;
        margin-left: 50%;
        margin-top: 5px;

    }

    .red {
        background-color: red;
    }

    .icon-layout {
        display: flex;
    }