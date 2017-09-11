using System;

namespace SaleManagement.WebApp2.Models.Response
{
    public class EmpCurrentLocationResponse
    {
        public long MyId { get; set; }

        public int EmpId { get; set; }

        public string EmpFullName { get; set; }

        public string PicLink { get; set; }

        public short CheckInPlan { get; set; }

        public short CheckInFinish { get; set; }

        public short NoOrder { get; set; }

        public string CurrLat { get; set; }

        public string CurrLong { get; set; }

        public string Branch { get; set; }

        public string Province { get; set; }

        public string EmpPosition { get; set; }

        public string EmpGrp { get; set; }

        public string Mobile { get; set; }

        public short NoCustOrder { get; set; }

        public short NoCustOrderActual { get; set; }

        public short NoDelOrder { get; set; }

        public short NoDelActual { get; set; }

        public short NoPicCap { get; set; }

        public DateTime LastUpdate { get; set; }

        public decimal NoDistance { get; set; }
    }
}
