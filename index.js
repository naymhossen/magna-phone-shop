const loadPhone = async (searchText = 'iphone', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    disPlayPhones(phones, isShowAll)
}

const disPlayPhones = (phones, isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }else{
        showAllContainer.classList.add('hidden');
    }
      

    

    // display first 12 phones

    if(!isShowAll){
        phones = phones.slice(0, 12);
    }
    if (phones.length === 0) {
            console.log('No Data Available');
            document.getElementById('search-condition').classList.remove('hidden')
        } else {
            console.log(phones);
            document.getElementById('search-condition').classList.add('hidden')
        }


    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList =  `card bg-base-100 shadow-xl`;
        phoneCard.innerHTML = `
       
        <figure class="px-10 pt-10">
        <img src=" ${phone.image} " alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
      <h3> ${phone.brand} </h3>
        <h2 class="card-title"> ${phone.phone_name} </h2>
        <p>Id: ${phone.slug}</p>
        <div class="card-actions">
          <button onclick="handaleShowDetail('${phone.slug}');
          show_details_modeal.showModal()" class="btn btn-primary">Show Details</button>
        </div>
      </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    togoleLodingSppiner(false);
}

// modal button click

const handaleShowDetail = async(id) => {
    // console.log('kidni phone', id);
    const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data;
    // console.log(phone);
    showPhoneDetailes(phone);
}

const showPhoneDetailes = (phone) =>{
    console.log(phone);
    // show_details_modeal.showModeal();

    const displayModealInfo = document.getElementById('display-modeal-info');
    displayModealInfo.innerHTML = `
    <div class=" flex justify-center">
    <img src=" ${phone.image} " />
    </div>
    <h2> <span class="text-3xl font-bold">${phone.name}</span></h2>
    <h2> <span>Storage: </span> ${phone?.mainFeatures?.storage}</h2>
    <h2> <span>Storage: </span> ${phone?.mainFeatures?.displaySize}</h2>
    <h2> <span>Storage: </span> ${phone?.mainFeatures?.chipSet}</h2>
    <h2> <span>Storage: </span> ${phone?.mainFeatures?.memory}</h2>
    <h2> <span>Storage: </span> ${phone?.slug}</h2>
    <h2> <span>Storage: </span> ${phone?.releaseDate}</h2>
    <h2><span>Brand: </span>${phone?.brand}</h2>
    <h2><span>GPS: </span>${phone?.others?.GPS || 'No GPS Available'}</h2>
    `;
}

const handleSearch = (isShowAll) => {
    togoleLodingSppiner(true);
    const searchFiled = document.getElementById('search-feild');
    const searchText = searchFiled.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const togoleLodingSppiner = (isLoding) => {
    const lodingSpiner = document.getElementById('loding-spinner');
    if(isLoding){
        lodingSpiner.classList.remove('hidden');
    }else{
        lodingSpiner.classList.add('hidden');
    }
}

const handelShowAll = () => {
    handleSearch(true);
}




loadPhone()