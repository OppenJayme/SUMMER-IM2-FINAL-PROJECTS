const Dashboard = () => {
    return (
        <>
         <div class="Main_container">
        <!-- SIDEBAR -->
        <div id="dashboard_sidebar" class="dashboard_sidebar">
            <div class="dashboard_sidebar_user">
                <h1>STOCKWISE</h1>
                <img src="img/logo.png" alt="">
            </div>
            <div class="dashboard_sidebar_menus">
                <ul class="dashboard_menu_lists">
                    <li class="Menu_active"><a href="/dashboard"><ion-icon name="aperture"></ion-icon> Dashboard</a></li>
                    <li><a href="/report"><ion-icon name="bar-chart-sharp"></ion-icon> Reports</a></li>
                </ul>
            </div>
        </div>
        <!-- SIDEBAR -->

        <div class="dashboard_content_container">
            <!-- TopNav -->
            <div class="dashboard_topNav">
                <div class="Menu-Pop" onclick="toggleSidebar()"><ion-icon name="menu"></ion-icon></div>
                <a class="logoutBtn" href="/landingpage"><ion-icon name="power"></ion-icon>Log-out</a>
            </div>
            <!-- TopNav -->

            <!-- Content -->
            <div class="dashboard_content">
                <h1 class="addproductheader"><ion-icon class="addprodicon" name="add-sharp"></ion-icon>Add Products</h1>
                <div id="formModal" class="form-modal">
                    <form id="productForm" action="/dashboard/addProduct" method="POST" enctype="multipart/form-data">
                        <label for="itemName">Item Name:</label>
                        <input type="text" id="itemName" name="itemName" required>
                        
                        <label for="price">Price:</label>
                        <input type="number" id="price" name="price" required>
                        
                        <label for="quantity">Quantity:</label>
                        <input type="number" id="quantity" name="quantity" required>
                        
                        <label for="supplier">Supplier:</label>
                        <input type="text" id="supplier" name="supplier" required>
                        
                        <label for="itemPicture">Image:</label>
                        <input type="file" id="itemPicture" name="itemPicture" accept="image/*" required>
                        
                        <button type="submit">Add Product</button>
                    </form>
                    
                </div>
            </div>
            <!-- Content -->
        </div>
    </div>
    
    <script>
    function toggleSidebar() {
        const sidebar = document.getElementById('dashboard_sidebar');
        const mainContainer = document.querySelector('.Main_container');
        const topnav = document.querySelector('.dashboard_topNav');
        const content = document.querySelector('.dashboard_content');
        
        sidebar.classList.toggle('hidden');
        mainContainer.classList.toggle('sidebar-hidden');
        content.classList.toggle('topnav-hidden');
        topnav.classList.toggle('content-hidden');
    }
    </script>
        </>
    )   
}

export default Dashboard;
