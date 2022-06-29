using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace NilveraTodo.Models
{
    public class Kullanici
    {
        public int Id { get; set; }
        public string AdSoyad { get; set; }
        public string Telefon { get; set; }
        public string FirmaIsmi { get; set; }
        public string Adres { get; set; }
        public DateTime Tarih { get; set; }

    }
}
