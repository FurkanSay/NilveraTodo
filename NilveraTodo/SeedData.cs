
using NilveraTodo.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NilveraTodo
{
    public class Seed
    {
        public static async Task SeedData(DbContext context)
        {
        
            await KullaniciEkle(context);
        }
        
        public static async Task KullaniciEkle(DbContext context)
        {
            #region Database'de Kullanici yoksa Kullanici ekleme
            try
            {

                if (!context.Kullanici.Any())
                {
                    var users = new List<Kullanici>
                {
                    new Kullanici
                {

                    AdSoyad = "Ahmet Karali",
                    FirmaIsmi = "Firma A",
                    Telefon = "123124123",
                    Adres = "Adres",
                    Tarih = DateTime.Now

                },
                        new Kullanici
                {


                    AdSoyad = "Furkan Mazgal",
                    FirmaIsmi = "Firma B",
                    Telefon = "123124123",
                    Adres = "Adres",
                    Tarih = DateTime.Now

                },
                        new Kullanici
                {

                     AdSoyad = "Merve Cangoz",
                    FirmaIsmi = "Firma C",
                    Telefon = "123124123",
                    Adres = "Adres",
                    Tarih = DateTime.Now

                },
                };
                    await context.Kullanici.AddRangeAsync(users);
                    var result = await context.SaveChangesAsync() > 0;

                }

            }
            catch (Exception ex)
            {

            }
            #endregion
        }
     

    }
}