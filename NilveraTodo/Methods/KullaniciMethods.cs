using NilveraTodo.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using System.Linq;


namespace NilveraTodo.Methods
{
    public class KullaniciMethods
    {
        public static async Task<Result> KullaniciEkle(string adisoyadi, string telefon, string firmaismi, string adres, DbContext context)
        {
            try
            {
                if (string.IsNullOrEmpty(adisoyadi) || string.IsNullOrEmpty(telefon) || string.IsNullOrEmpty(firmaismi) || string.IsNullOrEmpty(adres)) return new Result() { Success = false };
                var newMusteri = new Kullanici()
                {
                    AdSoyad = adisoyadi,
                    FirmaIsmi = firmaismi,
                    Tarih = DateTime.Now,
                    Telefon = telefon,
                    Adres = adres

                };
                await context.Kullanici.AddAsync(newMusteri);
                var added = await context.SaveChangesAsync() > 0;
                if (!added) new Result() { Success = false };
                return new Result() { Success = true };

            }
            catch (Exception ex)
            {
                return new Result() { Success = false };
            }
        }
        public static async Task<Result> KullaniciGuncelle(int Id, string adisoyadi, string telefon, string firmaismi, string adres, DbContext context)
        {
            try
            {
                if (string.IsNullOrEmpty(adisoyadi) || string.IsNullOrEmpty(telefon) || string.IsNullOrEmpty(firmaismi) || Id == 0) return new Result() { Success = false };
                var musteri = await context.Kullanici.FirstOrDefaultAsync(x => x.Id == Id);
                if (musteri == null) return await KullaniciEkle(adisoyadi, telefon, firmaismi, adres, context);
                musteri.AdSoyad = adisoyadi ?? musteri.AdSoyad;
                musteri.Telefon = telefon ?? musteri.Telefon;
                musteri.FirmaIsmi = firmaismi ?? musteri.FirmaIsmi;
                musteri.Adres = adres ?? musteri.Adres;
                var updated = await context.SaveChangesAsync() > 0;
                if (!updated) new Result() { Success = false };
                return new Result() { Success = true };
            }
            catch (Exception ex)
            {
                return new Result() { Success = false };
            }


        }
        public static async Task<Result> KullaniciSil(int Id, DbContext context)
        {
            try
            {
                if (Id == 0) return new Result() { Success = false };
                var musteri = await context.Kullanici.FirstOrDefaultAsync(x => x.Id == Id);
                if (musteri == null) return new Result() { Success = false };

                context.Kullanici.Remove(musteri);
                var deleted = await context.SaveChangesAsync() > 0;
                if (!deleted) new Result() { Success = false };
                return new Result() { Success = true };
            }
            catch (Exception ex)
            {
                return new Result() { Success = false };
            }



        }
        public static async Task<Result> KullaniciListesi(DbContext context)
        {
            try
            {
                var data = await context.Kullanici.ToListAsync();
                return new Result() { Data = data, Success = true };
            }
            catch (Exception ex)
            {
                return new Result() { Success = false };
            }
        }
    }
}
