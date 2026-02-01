/*
 * register.js
 *
 * يدير نموذج التسجيل لدورة قياس بلس. يقوم بملء معلومات الدورة بناءً على
 * تعريف محلي، ويتحكم في إظهار الحقول الشرطية الخاصة بالخطة وطريقة الدفع،
 * كما يحاكي عملية الإرسال بإظهار رسالة نجاح.
 */

(function () {
  'use strict';
  // تعريف بيانات الدورة. يمكن تعديل السعر والخصم ومدة الدورة وميزات الدورة.
  const coursesData = [
    {
      id: 'qiyasplus',
      title: 'دورة قياس بلس المكثفة',
      description: 'برنامج تدريبي شامل يغطي جميع أقسام اختبار STEP مع محاضرات، ملفات ونماذج محدثة.',
      price: 600,
      discount: 250,
      image: 'assets/img/course1.jpg',
      duration: '30 يوم',
      includes: ['محاضرات تمهيدية', 'قواعد واستثناءات', 'استراتيجيات قراءة واستماع', 'نماذج وحلول']
    }
  ];

  // عناصر DOM
  const courseInfoDiv = document.getElementById('courseInfo');
  const registerForm = document.getElementById('registerForm');
  const didLevelTest = document.getElementById('didLevelTest');
  const planField = document.getElementById('planField');
  const noPlanNotice = document.getElementById('noPlanNotice');
  const paymentMethod = document.getElementById('paymentMethod');
  const bankDetails = document.getElementById('bankDetails');
  const telegramDetails = document.getElementById('telegramDetails');
  const successMsg = document.getElementById('successMsg');

  // ملء معلومات الدورة (لا توجد باراميترات في العنوان لذلك نعرض الدورة الوحيدة)
  function showCourseInfo() {
    const course = coursesData[0];
    courseInfoDiv.innerHTML = `
      <h2 style="color: var(--primary-color); margin-bottom:0.5rem;">${course.title}</h2>
      <p style="color: var(--muted-color); margin-bottom:0.5rem;">${course.description}</p>
      <ul style="color: var(--muted-color); margin-bottom:0.5rem; list-style:inside circle;">
        ${course.includes.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <p style="color: var(--primary-color); font-weight:bold;">السعر الحالي: ${new Intl.NumberFormat('ar-SA', { style:'currency', currency:'SAR', minimumFractionDigits:0 }).format(course.discount)}
        <span style="text-decoration:line-through; color:#888; font-size:0.9rem;">${new Intl.NumberFormat('ar-SA', { style:'currency', currency:'SAR', minimumFractionDigits:0 }).format(course.price)}</span></p>
    `;
  }

  // إظهار/إخفاء خانة الخطة بناءً على الإجابة
  didLevelTest.addEventListener('change', () => {
    if (didLevelTest.value === 'yes') {
      planField.style.display = 'block';
      noPlanNotice.style.display = 'none';
    } else if (didLevelTest.value === 'no') {
      planField.style.display = 'none';
      noPlanNotice.style.display = 'block';
    } else {
      planField.style.display = 'none';
      noPlanNotice.style.display = 'none';
    }
  });

  // إظهار/إخفاء تفاصيل الدفع
  paymentMethod.addEventListener('change', () => {
    const receiptInput = document.getElementById('receipt');
    if (paymentMethod.value === 'bank') {
      bankDetails.style.display = 'block';
      telegramDetails.style.display = 'none';
      if (receiptInput) receiptInput.required = true;
    } else if (paymentMethod.value === 'telegram') {
      bankDetails.style.display = 'none';
      telegramDetails.style.display = 'block';
      if (receiptInput) receiptInput.required = false;
    } else {
      bankDetails.style.display = 'none';
      telegramDetails.style.display = 'none';
      if (receiptInput) receiptInput.required = false;
    }
  });

  // معالجة إرسال النموذج
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // إذا كان اختبار المستوى نعم ولم يرفق الخطة
    const planText = document.getElementById('planText');
    if (didLevelTest.value === 'yes' && planText && !planText.value.trim()) {
      alert('يرجى إرفاق خطتك أو نسخها في الحقل المخصص.');
      return;
    }
    // إذا كانت طريقة الدفع هي التحويل البنكي ولم يتم إرفاق الإيصال
    const receipt = document.getElementById('receipt');
    if (paymentMethod.value === 'bank') {
      if (!receipt || !receipt.files || receipt.files.length === 0) {
        alert('يرجى إرفاق صورة إيصال التحويل البنكي.');
        return;
      }
    }
    // نجاح مبدئي
    successMsg.style.display = 'block';
    registerForm.reset();
    bankDetails.style.display = 'none';
    telegramDetails.style.display = 'none';
    planField.style.display = 'none';
    noPlanNotice.style.display = 'none';
  });

  // تشغيل عند تحميل الصفحة
  document.addEventListener('DOMContentLoaded', () => {
    showCourseInfo();
  });
})();