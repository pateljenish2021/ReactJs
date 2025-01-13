
const NotesKeeper = () => {
    return (
    <>
        <nav>
      <div class="logo-area">
        <div class="tooltip">
          <span class="material-icons-outlined hover">menu</span>
          <span class="tooltip-text">Main Menu</span>
        </div>

        <img
          class="gb_uc gb_7d"
          src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
          srcset="
            https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png 1x,
            https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png 2x
          "
          alt=""
          aria-hidden="true"
          width={"40px"}
        />
        <span class="logo-text">Keep</span>
      </div>

      <div class="search-area">
        <div class="tooltip">
          <span class="material-icons-outlined hover">search</span>
          <span class="tooltip-text">Search</span>
        </div>
        <input type="text" placeholder="Search" />
      </div>
      <div class="settings-area">
        <div class="tooltip">
          <span class="material-icons-outlined hover">refresh</span>
          <span class="tooltip-text">Refresh</span>
        </div>
        <div class="tooltip">
          <span class="material-icons-outlined hover">view_agenda</span>
          <span class="tooltip-text">List View</span>
        </div>
        <div class="tooltip">
          <span class="material-icons-outlined hover">settings</span>
          <span class="tooltip-text">Settings</span>
        </div>
      </div>
      <div class="profile-actions-area">
        <div class="tooltip">
          <span class="material-icons-outlined hover">apps</span>
          <span class="tooltip-text">Apps</span>
        </div>
        <div class="tooltip">
          <span class="material-icons-outlined hover">account_circle</span>
          <span class="tooltip-text">Account</span>
        </div>
      </div>
    </nav>

    <main>
      <div class="sidebar">
        <div class="sidebar-item">
          <span class="material-icons-outlined hover active">lightbulb</span>
          <span class="sidebar-text">Notes</span>
        </div>
        <div class="sidebar-item">
          <span class="material-icons-outlined hover">notifications</span>
          <span class="sidebar-text">Reminders</span>
        </div>
        <div class="sidebar-item">
          <span class="material-icons-outlined hover">edit</span>
          <span class="sidebar-text">Edit Labels</span>
        </div>
        <div class="sidebar-item">
          <span class="material-icons-outlined hover">archive</span>
          <span class="sidebar-text">Archive</span>
        </div>
        <div class="sidebar-item">
          <span class="material-icons-outlined hover">delete</span>
          <span class="sidebar-text">Trash</span>
        </div>
      </div>
      <div class="form-container">
        <form>
          <input class="note-text" type="text" placeholder="Take a note..." />
          <div class="form-actions">
            <div class="tooltip">
              <span class="material-icons-outlined hover">check_box</span>
              <span class="tooltip-text">New List</span>
            </div>
            <div class="tooltip">
              <span class="material-icons-outlined hover">brush</span>
              <span class="tooltip-text">New Drawing</span>
            </div>
            <div class="tooltip">
              <span class="material-icons-outlined hover">image</span>
              <span class="tooltip-text">New Image</span>
            </div>
          </div>
        </form>
      </div>

      <div class="form-container active-form">
        <form>
          <input type="text" class="note-title" placeholder="Title" />
          <input class="note-text" type="text" placeholder="Take a note..." />
          <div class="form-actions">
            <div class="icons">
              <div class="tooltip">
                <span class="material-icons-outlined hover small-icon"
                  >add_alert</span
                >
                <span class="tooltip-text">Remind me</span>
              </div>
              <div class="tooltip">
                <span class="material-icons-outlined hover small-icon"
                  >person_add</span
                >
                <span class="tooltip-text">Collaborator</span>
              </div>
              <div class="tooltip">
                <span class="material-icons-outlined hover small-icon"
                  >palette</span
                >
                <span class="tooltip-text">Change Color</span>
              </div>
              <div class="tooltip">
                <span class="material-icons-outlined hover small-icon"
                  >image</span
                >
                <span class="tooltip-text">Add Image</span>
              </div>
              <div class="tooltip">
                <span class="material-icons-outlined hover small-icon"
                  >archive</span
                >
                <span class="tooltip-text">Archive</span>
              </div>
              <div class="tooltip">
                <span class="material-icons-outlined hover small-icon"
                  >more_vert</span
                >
                <span class="tooltip-text">More</span>
              </div>
              <div class="tooltip">
                <span class="material-icons-outlined hover small-icon"
                  >undo</span
                >
                <span class="tooltip-text">Undo</span>
              </div>
              <div class="tooltip">
                <span class="material-icons-outlined hover small-icon"
                  >redo</span
                >
                <span class="tooltip-text">Redo</span>
              </div>
            </div>
            <button class="close-btn">Close</button>
          </div>
        </form>
      </div>

      <div class="notes">
        <div class="note">
          <span class="material-icons check-circle">check_circle</span>
          <div class="title">Title</div>
          <div class="text">Text</div>
          <div class="note-footer">
            <div class="tooltip">
              <span class="material-icons-outlined hover small-icon"
                >add_alert</span
              >
              <span class="tooltip-text">Remind me</span>
            </div>
            <div class="tooltip">
              <span class="material-icons-outlined hover small-icon"
                >person_add</span
              >
              <span class="tooltip-text">Collaborator</span>
            </div>
            <div class="tooltip">
              <span class="material-icons-outlined hover small-icon"
                >palette</span
              >
              <span class="tooltip-text">Change Color</span>
            </div>
            <div class="tooltip">
              <span class="material-icons-outlined hover small-icon"
                >image</span
              >
              <span class="tooltip-text">Add Image</span>
            </div>
            <div class="tooltip">
              <span class="material-icons-outlined hover small-icon"
                >archive</span
              >
              <span class="tooltip-text">Archive</span>
            </div>
            <div class="tooltip">
              <span class="material-icons-outlined hover small-icon"
                >more_vert</span
              >
              <span class="tooltip-text">More</span>
            </div>
          </div>
        </div>
      </div>

      <div class="modal">
        <div class="modal-content">
          <div class="form-container active-form">
            <form>
              <input type="text" class="note-title" placeholder="Title" />
              <input
                class="note-text"
                type="text"
                placeholder="Take a note..."
              />
              <div class="form-actions">
                <div class="icons">
                  <div class="tooltip">
                    <span class="material-icons-outlined hover small-icon"
                      >add_alert</span
                    >
                    <span class="tooltip-text">Remind me</span>
                  </div>
                  <div class="tooltip">
                    <span class="material-icons-outlined hover small-icon"
                      >person_add</span
                    >
                    <span class="tooltip-text">Collaborator</span>
                  </div>
                  <div class="tooltip">
                    <span class="material-icons-outlined hover small-icon"
                      >palette</span
                    >
                    <span class="tooltip-text">Change Color</span>
                  </div>
                  <div class="tooltip">
                    <span class="material-icons-outlined hover small-icon"
                      >image</span
                    >
                    <span class="tooltip-text">Add Image</span>
                  </div>
                  <div class="tooltip">
                    <span class="material-icons-outlined hover small-icon"
                      >archive</span
                    >
                    <span class="tooltip-text">Archive</span>
                  </div>
                  <div class="tooltip">
                    <span class="material-icons-outlined hover small-icon"
                      >more_vert</span
                    >
                    <span class="tooltip-text">More</span>
                  </div>
                  <div class="tooltip">
                    <span class="material-icons-outlined hover small-icon"
                      >undo</span
                    >
                    <span class="tooltip-text">Undo</span>
                  </div>
                  <div class="tooltip">
                    <span class="material-icons-outlined hover small-icon"
                      >redo</span
                    >
                    <span class="tooltip-text">Redo</span>
                  </div>
                </div>
                <button class="close-btn">Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>

    </>

    )
}

export default NotesKeeper;