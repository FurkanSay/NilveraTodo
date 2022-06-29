using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NilveraTodo.Methods;
using NilveraTodo.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NilveraTodo.Controllers
{
    public class TodoController : Controller
    {
        private readonly DbContext _context;
        
        public TodoController(DbContext context)
        {
            _context = context;
           
        }
        public async Task<ActionResult> UserManager()
        {
            try
            {
              
                var res = await KullaniciMethods.KullaniciListesi(_context);

                var list = (List<Kullanici>)res.Data;
                ViewBag.Success = TempData["Success"];
                return View(list);
            }
            catch (Exception ex)
            {
                return View("Error");
            }
        }
        [HttpPost]
        public async Task<ActionResult> KullaniciYonet(int Id, string AdSoyad, string telefon, string firmaismi, string adres, string btnIslem)
        {
            try
            {
               
                
                if (btnIslem == "sil")
                {
                    var result = await KullaniciMethods.KullaniciSil(Id, _context);
                    TempData["Success"] = result.Success;
                    return RedirectToAction("UserManager");
                }
                else
                {
                    var result1 = await KullaniciMethods.KullaniciGuncelle(Id, AdSoyad, telefon, firmaismi, adres, _context);
                    TempData["Success"] = result1.Success;
                    return RedirectToAction("UserManager");
                }
            }
            catch (Exception ex)
            {
                return View("Error");
            }
        }
    }
}
